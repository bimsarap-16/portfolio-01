const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


// 1. Load environment variables
dotenv.config();
console.log(
    'Cloudinary API key loaded:',
    !!process.env.CLOUDINARY_API_KEY
);


const app = express();

const { protect } = require('./middleware/authMiddleware');

app.get('/api/auth/secret', protect, (req, res) => {
    res.json({ message: "You have accessed the secret area!", adminId: req.admin.id });
});


const heroRoutes = require('./routes/heroRoutes');

// 3. Middleware
app.use(cors());
app.use(express.json()); // Allows server to accept JSON data

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/hero', heroRoutes);

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));

// 4. Basic Route (Test if it's working)
app.get('/', (req, res) => {
  res.send('Backend API is running...');
});



const PORT = process.env.PORT || 5000;



const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();