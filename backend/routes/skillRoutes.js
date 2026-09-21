const express = require('express');
const router = express.Router();
const {
  addSkill,
  getSkills,
  deleteSkill,
  updateSkill,
} = require('../controllers/skillController.js');
// const { protect } = require('../middleware/authMiddleware'); // optional

// GET /api/skills
router.get('/', getSkills);

// POST /api/skills
router.post('/', addSkill);

// PUT /api/skills/:id
router.put('/:id', updateSkill);

// DELETE /api/skills/:id
router.delete('/:id', deleteSkill);

module.exports = router;
