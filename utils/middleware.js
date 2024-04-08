import loggers from './loggers.js';

const requestLogger = (request, response, next) => {
  console.log({
    method: request.method,
    body: request.body,
    path: request.path,
  });

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, response) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
};

const propertyDefault = (request, response, next) => {
  if (!request.body.hasOwnProperty('likes')) {
    request.body.likes = 0;
  }
  next();
};

const noTitle = (request, response, next) => {
  if (!request.body.hasOwnProperty('title') && request.method === 'POST') {
    return response.status(400).json({ error: 'Title or Url no exists' });
  }

  next(); // Llama a next() para pasar la solicitud al siguiente middleware
};

export default { requestLogger, errorHandler, unknownEndpoint, propertyDefault, noTitle };
