const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    path: { type: String, required: true },
    label: { type: String, required: true },
  
    createdAt: { type: Date, default: Date.now }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;

