const Router = require('koa-router');
const BookController = require('../controllers/BookController');

const router = new Router();

router.get('/books', BookController.getBooks);
router.get('/book/:id', BookController.getBook);
router.post('/book', BookController.addBook);
router.delete('/book/:id', BookController.deleteBook);
router.put('/book/:id', BookController.updateBook);

module.exports = router;
