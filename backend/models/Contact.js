const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    


    icon: { type: String, required: true },  // e.g., "📧"
    label: { type: String, required: true }, // e.g., "Email"
    info: { type: String, required: true },  // e.g., "your@email.com"
    link: { type: String, required: true }   // e.g., "mailto:your@email.com"

     
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);