import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import errorCatcher from './middlewares/error-catcher';

const { DB_ADDRESS = "mongodb://127.0.0.1:27017/mestodb" } = process.env;
const { PORT = 3000 } = process.env;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS);

server.use((req, res, next) => {
  req.body.user = {
    _id: '6563368b1fe808a8a4170f78',
  };
  next();
});

server.use(router);

server.use(errorCatcher);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
