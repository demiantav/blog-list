import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';
import helper from './blogtest_helper.js';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = helper.listBlog.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('correct get and content-type', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('correct length of blogs: 2 blogs', async () => {
  const blogDb = await api.get('/api/blogs');

  assert.strictEqual(blogDb.body.length, helper.listBlog.length);
});

test('attribute id exist in all blogs', async () => {
  const blogs = await api.get('/api/blogs');

  const testResult = blogs.body.every((blog) => blog.id !== undefined);

  assert(testResult);
});

test('a blog can be added', async () => {
  const blogToAdd = {
    title: 'Aprender a cantar',
    author: 'Onlines',
    url: 'https://onlines.com.ar/',
    likes: 59,
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const blogsDb = await helper.blogDb();

  assert.strictEqual(blogsDb.length, helper.listBlog.length + 1);

  const titles = blogsDb.map((blog) => blog.title);

  assert(titles.includes('Aprender a cantar'));
});
