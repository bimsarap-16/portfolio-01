const express = require('express');
const router = express.Router();
const { addProject, getProjects, deleteProject } = require('../controllers/projectController.js');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route: Anyone can see your projects
router.get('/', getProjects);

// Protected route: Only you (with a token) can add projects
router.post('/add', protect, upload.single('image'), addProject);
// Notice we use :id to know which project to delete
router.delete('/:id', protect, deleteProject);

module.exports = router;