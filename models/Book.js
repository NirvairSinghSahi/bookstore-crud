// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 }
});

module.exports = mongoose.model('Book', bookSchema);
