import { Router } from 'express';

import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import middleware from '../utils/middleware.js';
const blogRouter = Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('userId', { userName: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});
blogRouter.post('/', middleware.getToken);
blogRouter.post('/', middleware.noTitle);
blogRouter.post('/', middleware.propertyDefault);

blogRouter.post('/', middleware.getUser, async (request, response, next) => {
  const { title, author, url, likes, user } = request.body;

  const userAssigned = user;

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    userId: user._id,
  });
  try {
    const blogSended = await newBlog.save();
    userAssigned.blogs = userAssigned.blogs.concat(blogSended._id);
    await userAssigned.save();

    const populatedBlog = await blogSended.populate('userId', { userName: 1 });
    response.status(201).json(populatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  const { likes } = body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    );
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete(
  '/:id',
  middleware.getToken,
  middleware.getUser,
  async (request, response, next) => {
    const { id } = request.params;
    const { user } = request.body;

    try {
      const blogToDelete = await Blog.findById(id);
      if (blogToDelete.userId.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(id);
        return response.status(204).end();
      } else return response.status(400).json({ error: 'Invalid blog to eliminate' });
    } catch (error) {
      next(error);
    }
  }
);

export default blogRouter;
