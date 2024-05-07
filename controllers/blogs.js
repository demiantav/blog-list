import { Router } from 'express';

import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import User from '../models/user.js';

const blogRouter = Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('userId', { userName: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes, token } = request.body;

  const tokenExtraction = jwt.verify(token, process.env.SECRET);

  if (!tokenExtraction.id) {
    return response.status(400).json({ error: 'Invalid token' });
  }

  const userAssigned = await User.findById(tokenExtraction.id);

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    userId: userAssigned._id,
  });

  try {
    const blogSended = await newBlog.save();
    userAssigned.blogs = userAssigned.blogs.concat(blogSended._id);
    await userAssigned.save();
    response.status(201).json(blogSended);
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  const { likes } = body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true, context: 'query' });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  const { token } = request.body;

  const tokenExtraction = jwt.verify(token, process.env.SECRET);

  if (!tokenExtraction.id) {
    return response.status(400).json({ error: 'Invalid token' });
  }

  try {
    const blogToDelete = await Blog.findById(id);
    if (blogToDelete.userId.toString() === tokenExtraction.id.toString()) {
      await Blog.findByIdAndDelete(id);
      return response.status(204).end();
    } else return response.status(400).json({ error: 'Invalid blog to eliminate' });
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
