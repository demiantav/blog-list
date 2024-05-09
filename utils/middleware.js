import { get } from 'mongoose';
import jwt from 'jsonwebtoken';
import loggers from './loggers.js';
import User from '../models/user.js';

const requestLogger = (request, response, next) => {
  loggers.info({
    method: request.method,
    body: request.body,
    path: request.path,
  });

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const propertyDefault = (request, response, next) => {
  if (!request.body.hasOwnProperty('likes')) {
    request.body.likes = 0;
  }
  next();
};

const noTitle = (request, response, next) => {
  if (!request.body.hasOwnProperty('title') && request.method === 'POST') {
    return response.status(400).json({ error: 'Title no exists' });
  }

  next(); // Llama a next() para pasar la solicitud al siguiente middleware
};

const getToken = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    request.body.token = authorization.replace('Bearer ', '');
  } else {
    request.body.token = null;
  }

  next();
};

const getUser = async (request, response, next) => {
  const { token } = request.body;
  if (!token) {
    response.status(401).json({ error: 'Authorization failed' });
  } else {
    const tokenExtraction = jwt.verify(token, process.env.SECRET);

    if (!tokenExtraction.id) {
      return response.status(400).json({ error: 'Invalid token' });
    }

    request.body.user = await User.findById(tokenExtraction.id);

    next();
  }
};

// eslint-disable-next-line max-len
export default { requestLogger, errorHandler, unknownEndpoint, propertyDefault, noTitle, getToken, getUser };
