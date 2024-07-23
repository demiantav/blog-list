import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import blogRouter from './controllers/blogs.js';
import userRouter from './controllers/users.js';
import config from './utils/config.js';
import loggers from './utils/loggers.js';
import middleware from './utils/middleware.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/reset.js';

const app = express();

mongoose.set('strictQuery', false);
loggers.info('Connecting to Mongoose...');

mongoose
  .connect(config.MONGO_URI)
  .then((result) => {
    loggers.info('Connected to MongoDb');
  })
  .catch((error) => {
    loggers.error(error);
  });

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
