import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const {DB_ADDRESS = "mongodb://127.0.0.1:27017/mestodb"} = process.env;
const { PORT = 3000 } = process.env;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS);

server.use((req, res, next) => {
  req.body.user = {
    _id: '655cab2ceec037f0a8edf926'
  };
  next();
});

server.use('/users', usersRouter);
server.use('/cards', cardsRouter);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});