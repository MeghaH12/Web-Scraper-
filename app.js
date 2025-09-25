const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian Fiction"
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance"
  }
];

// Counter for generating unique IDs
let nextId = 4;

// Helper function to find book by ID
const findBookById = (id) => {
  return books.find(book => book.id === parseInt(id));
};

// Helper function to validate book data
const validateBook = (book) => {
  const errors = [];

  if (!book.title || typeof book.title !== 'string' || book.title.trim() === '') {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
    errors.push('Author is required and must be a non-empty string');
  }

  if (book.year && (!Number.isInteger(book.year) || book.year < 0 || book.year > new Date().getFullYear())) {
    errors.push('Year must be a valid integer between 0 and current year');
  }

  return errors;
};

// Routes

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /books/:id - Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  res.json({
    success: true,
    data: book
  });
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  const errors = validateBook(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors
    });
  }

  const newBook = {
    id: nextId++,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year || null,
    genre: req.body.genre ? req.body.genre.trim() : null
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /books/:id - Update a book completely
app.put('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  const errors = validateBook(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors
    });
  }

  // Update the book
  book.title = req.body.title.trim();
  book.author = req.body.author.trim();
  book.year = req.body.year || null;
  book.genre = req.body.genre ? req.body.genre.trim() : null;

  res.json({
    success: true,
    message: 'Book updated successfully',
    data: book
  });
});

// PATCH /books/:id - Update a book partially
app.patch('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  // Create a temporary object with current book data and proposed updates
  const updatedBook = { ...book, ...req.body };
  const errors = validateBook(updatedBook);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors
    });
  }

  // Apply updates
  if (req.body.title !== undefined) book.title = req.body.title.trim();
  if (req.body.author !== undefined) book.author = req.body.author.trim();
  if (req.body.year !== undefined) book.year = req.body.year;
  if (req.body.genre !== undefined) book.genre = req.body.genre ? req.body.genre.trim() : null;

  res.json({
    success: true,
    message: 'Book updated successfully',
    data: book
  });
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(Books API server is running on http://localhost:${PORT});
  console.log('\nAvailable endpoints:');
  console.log('GET    /books     - Get all books');
  console.log('GET    /books/:id - Get book by ID');
  console.log('POST   /books     - Create new book');
  console.log('PUT    /books/:id - Update book completely');
  console.log('PATCH  /books/:id - Update book partially');
  console.log('DELETE /books/:id - Delete book');
});

module.exports = app;