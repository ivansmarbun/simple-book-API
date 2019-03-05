process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../index');

describe('GET /books', () => {
  it('respond with json containing a list of all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });
  it('respond an 404 because doesnt need an path parameter', async () => {
    const response = await request(app).get('/books/1');
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });
});

describe('POST /book', () => {
  it('should report an error because incomplete fields', async () => {
    const book = {
      author: 'Ivan'
    };

    const response = await request(app)
      .post('/book')
      .send(book);
    expect(response.status).toEqual(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toEqual('There was an error occured');
  });

  it('should create new book with', async () => {
    const book = {
      author: 'Ivan',
      title: 'Book Test 1',
      description: 'About book test 1'
    };

    const response = await request(app)
      .post('/book')
      .send(book);
    expect(response.status).toEqual(200);
    expect(Object.keys(response.body.book)).toEqual(
      expect.arrayContaining(['author', 'title', 'description', 'createdAt'])
    );
    expect(response.body.book.author).toEqual(book.author);
    expect(response.body.book.title).toEqual(book.title);
    expect(response.body.book.description).toEqual(book.description);
  });
});

describe('PUT /book/:id', async () => {
  it('should respond an error because no book with specific id', async () => {
    const response = await request(app).put('/book/1');
    expect(response.status).toEqual(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toEqual('There was an error occured');
  });

  it('should update the book with some change', async () => {
    const book = {
      author: 'Ivan Test',
      title: 'Book Test 2',
      description: 'About test book 2'
    };

    const newBook = await request(app)
      .post('/book')
      .send(book);

    const updateBook = {
      author: 'Dante'
    };

    const response = await request(app)
      .put(`/book/${newBook.body.book._id}`)
      .send(updateBook);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('book');
    expect(response.body.message).toEqual(
      `Book with id: ${newBook.body.book._id} has been sucessfully updated`
    );
    expect(response.body.book.author).toEqual(updateBook.author);
  });
});

describe('DELETE /book/:id', async () => {
  it('should respond an error because no book with specific id can be deleted', async () => {
    const response = await request(app).delete('/book/1');

    expect(response.status).toEqual(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toEqual('There was an error occured');
  });

  it('should successfully deleted 1 book with specific id', async () => {
    const books = await request(app).get('/books');

    const response = await request(app).delete(`/book/${books.body[0]._id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(`Book with id: ${books.body[0]._id} has been sucessfully deleted`)
  })
});
