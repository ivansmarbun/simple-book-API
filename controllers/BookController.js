const Book = require('../models/Book');

const getBooks = async ctx => {
  try {
    const books = await Book.find({});
    ctx.status = 200;
    if (books != []) {
      ctx.body = books;
    } else {
      ctx.body = {
        message: 'No book was found in database'
      };
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: 'There was an error occured',
      error: error.message
    };
  }
};

const getBook = async ctx => {
  const id = ctx.params.id;

  try {
    const book = await Book.findById(id);
    ctx.status = 200;
    ctx.body = book;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: 'There was an error occured',
      error: error.message
    };
  }
};

const addBook = async ctx => {
  try {
    const book = await new Book(ctx.request.body).save();
    ctx.status = 200;
    ctx.body = {
      message: 'Book is successfuly saved',
      book: book
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: 'There was an error occured',
      error: error.message
    };
  }
};

const deleteBook = async ctx => {
  const id = ctx.params.id;

  try {
    await Book.deleteOne({ _id: id });
    ctx.status = 200;
    ctx.body = {
      message: `Book with id: ${id} has been sucessfully deleted`
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: 'There was an error occured',
      error: error.message
    };
  }
};

const updateBook = async ctx => {
  const id = ctx.params.id;

  try {
    const book = await Book.findById({ _id: id });
    await Object.assign(book, ctx.request.body).save();
    ctx.status = 200;
    ctx.body = {
      message: `Book with id: ${id} has been sucessfully updated`,
      book: book,
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: 'There was an error occured',
      error: error.message
    };
  }
};

module.exports = { getBooks, addBook, getBook, deleteBook, updateBook };
