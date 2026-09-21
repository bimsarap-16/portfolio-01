// routes/heroRoutes.js
const express = require('express');
const Hero = require('../models/Hero');
const router = express.Router();

// ✅ CREATE hero (POST /api/hero)
router.post('/', async (req, res) => {
  try {
    const hero = new Hero(req.body);
    await hero.save();
    res.status(201).json(hero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ READ hero (GET /api/hero)
router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE hero (PUT /api/hero/:id)
router.put('/:id', async (req, res) => {
  try {
    const hero = await Hero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
