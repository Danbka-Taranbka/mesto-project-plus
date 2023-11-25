import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import { errors } from 'celebrate';
import errorCatcher from './middlewares/error-catcher';
import { errorLogger, requestLogger } from './middlewares/logger';
import routes from "./routes";

const { DB_ADDRESS = "mongodb://127.0.0.1:27017/mestodb" } = process.env;
const { PORT = 3000 } = process.env;

const server = express();
mongoose.connect(DB_ADDRESS);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(requestLogger);
server.use(routes);

server.use(errorLogger);
server.use(errors());
server.use(errorCatcher);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
