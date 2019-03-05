const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const keys = require('./config/keys');
const bookRoute = require('./routes/BookRouter');

(async () => {
  await mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, (error) => {
    if (error) console.error(`There was an error: ${error}`);
    else console.log('Connection Success');
  });
})();

const app = new Koa();

app.use(bodyParser());
app.use(bookRoute.routes());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

module.exports = server;
