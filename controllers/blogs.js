import { Router } from 'express';

import Blog from '../models/blog.js';

const blogRouter = Router();

blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((res) => {
      response.json(res);
    })
    .catch((error) => next(error));
});

blogRouter.post('/', (request, response, next) => {
  const { body } = request;
  const { title, author, url, likes } = body;

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
  });

  newBlog
    .save()
    .then((savedBlog) => {
      console.log('Blog guardado');
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

export default blogRouter;
