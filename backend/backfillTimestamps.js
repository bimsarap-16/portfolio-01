const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("./models/Admin"); // adjust path if needed

async function backfill(Model) {
  const docs = await Model.find({
    $or: [
      { createdAt: { $exists: false } },
      { updatedAt: { $exists: false } }
    ]
  });

  console.log(`Found ${docs.length} docs missing timestamps in ${Model.modelName}`);

  for (const doc of docs) {
    const created = doc._id.getTimestamp();

    if (!doc.createdAt) doc.createdAt = created;
    if (!doc.updatedAt) doc.updatedAt = doc.createdAt;

    await doc.save({ timestamps: false });
  }

  console.log(`Updated ${docs.length} docs in ${Model.modelName}`);
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // 👉 ADD THESE TWO LINES HERE
    console.log("DB name:", mongoose.connection.name);
    console.log("Collection:", Admin.collection.name);

    await backfill(Admin);

    await mongoose.disconnect();
    console.log("Done");
  } catch (err) {
    console.error(err);
  }
}

main();
