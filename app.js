// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const booksRoutes = require('./routes/books');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');
app.set('views', './views');

// Routes
app.use('/books', booksRoutes);
app.get('/', (req, res) => res.redirect('/books'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
