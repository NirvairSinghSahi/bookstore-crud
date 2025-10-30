// routes/books.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');

// 1️⃣ Show all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
});

// 2️⃣ Form to add new book
router.get('/new', (req, res) => {
  res.render('new');
});

// 3️⃣ Create new book
router.post('/',
  [
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('pages').isInt({ min: 1 }),
    body('rating').isFloat({ min: 0, max: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.render('new', { errors: errors.array() });
    await Book.create(req.body);
    res.redirect('/books');
  }
);

// 4️⃣ View single book
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('show', { book });
});

// 5️⃣ Edit form
router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

// 6️⃣ Update
router.put('/:id', async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/books/${req.params.id}`);
});

// 7️⃣ Delete
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
});

module.exports = router;
