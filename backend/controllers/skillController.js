const Skill = require('../models/Skill');

exports.addSkill = async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Skill
exports.deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        precentage: req.body.precentage, // keep your schema field name
      },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
