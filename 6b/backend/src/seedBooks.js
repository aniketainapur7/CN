require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookstore';

const sample = [
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', price: 499, description: 'Classic dev book' },
  { title: 'Clean Code', author: 'Robert C. Martin', price: 399, description: 'Writing maintainable code' },
  { title: "You Don't Know JS", author: 'Kyle Simpson', price: 299, description: 'Deep JS insights' },
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to Mongo, seeding books...');
    await Book.deleteMany({});
    await Book.insertMany(sample);
    console.log('Seeded', sample.length, 'books');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seed failed', err);
    process.exit(1);
  });
