const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }, // Link to your project screenshot
    technologies: [String],     // Example: ['React', 'Node.js']
    liveLink: { type: String },  // Link to the working site
    githubLink: { type: String } // Link to the code
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);



