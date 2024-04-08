import { Router } from 'express';

import Blog from '../models/blog.js';

const blogRouter = Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (request, response, next) => {
  const { body } = request;
  const { title, author, url, likes } = body;

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
  });

  try {
    const blogSended = await newBlog.save();
    response.status(201).json(blogSended);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
