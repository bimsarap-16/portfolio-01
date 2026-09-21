// models/Hero.js
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'John Doe'
    },
    title: {
      type: String,
      required: true,
      default: 'Full Stack Developer & Creative Coder'
    },
    welcomeText: {
      type: String,
      required: true,
      default: 'Welcome'
    },
    buttonText: {
      type: String,
      required: true,
      default: 'View My Work'
    },
    buttonTarget: {
      type: String,
      required: true,
      default: 'projects' // section id for scrollToSection
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
