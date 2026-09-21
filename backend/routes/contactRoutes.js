const express = require('express');
const router = express.Router();
const { addContact, getContacts, deleteContact } = require('../controllers/contactController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Public route: Anyone can see your projects
router.get('/', getContacts);

// Protected route: Only you (with a token) can add projects
router.post('/add',  addContact);
// Notice we use :id to know which project to delete
router.delete('/:id',  deleteContact);

module.exports = router;