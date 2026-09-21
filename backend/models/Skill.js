const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    
    name: { type: String, required: true},
    precentage: { type: String, required: true }

}, { timestamps: true});

module.exports = mongoose.model('Skill', skillSchema);