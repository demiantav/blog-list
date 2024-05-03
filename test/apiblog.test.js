import { test, after, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../app.js';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import helper from './blogtest_helper.js';

const api = supertest(app);

// // beforeEach(async () => {
// //   await Blog.deleteMany({});
// //   const blogs = helper.listBlog.map((blog) => new Blog(blog));
// //   const promiseArray = blogs.map((blog) => blog.save());
// //   await Promise.all(promiseArray);
// // });

// // test('correct get and content-type', async () => {
// //   await api
// //     .get('/api/blogs')
// //     .expect(200)
// //     .expect('Content-type', /application\/json/);
// // });

// // test('correct length of blogs: 2 blogs', async () => {
// //   const blogDb = await api.get('/api/blogs');

// //   assert.strictEqual(blogDb.body.length, helper.listBlog.length);
// // });

// // test('attribute id exist in all blogs', async () => {
// //   const blogs = await api.get('/api/blogs');

// //   const testResult = blogs.body.every((blog) => blog.id !== undefined);

// //   assert(testResult);
// // });

// // test('a blog can be added', async () => {
// //   const blogToAdd = {
// //     title: 'Aprender a cantar',
// //     author: 'Onlines',
// //     url: 'https://onlines.com.ar/',
// //     likes: 59,
// //   };

// //   await api
// //     .post('/api/blogs')
// //     .send(blogToAdd)
// //     .expect(201)
// //     .expect('Content-type', /application\/json/);

// //   const blogsDb = await helper.blogDb();

// //   assert.strictEqual(blogsDb.length, helper.listBlog.length + 1);

// //   const titles = blogsDb.map((blog) => blog.title);

// //   assert(titles.includes('Aprender a cantar'));
// // });

// // test('a blog without likes, have likes=0', async () => {
// //   const blogWithoutLikes = {
// //     title: 'Blog sin likes',
// //     author: 'Onlines',
// //     url: 'https://onlines.com.ar/',
// //   };

// //   await api
// //     .post('/api/blogs')
// //     .send(blogWithoutLikes)
// //     .expect(201)
// //     .expect('Content-Type', /application\/json/);

// //   const blogsDb = await helper.blogDb();

// //   const blogWithoutLikesDb = blogsDb.find((blog) => blog.title === 'Blog sin likes');

// //   assert.strictEqual(blogWithoutLikesDb.likes, 0);
// // });

// // test('a blog without title or url respond status code 400', async () => {
// //   const blogWithoutTitle = {
// //     author: 'Onlines',
// //     url: 'https://onlines.com.ar/',
// //   };

// //   await api.post('/api/blogs').send(blogWithoutTitle).expect(400);
// // });

// // test('delete a single blog', async () => {
// //   const blogsDB = await helper.blogDb();

// //   const blogToDelete = blogsDB[0];

// //   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

// //   const blogsWithoutANote = await helper.blogDb();

// //   assert.deepStrictEqual(blogsWithoutANote.length, helper.listBlog.length - 1);
// // });

// // test('update a blog', async () => {
// //   const blogsDb = await helper.blogDb();

// //   const blogToUpdate = blogsDb[1];

// //   await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 100 }).expect(200);
// // });

// describe('Unit tests for Users creation', () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//     const hashPassword = await bcrypt.hash('12345', 10);

//     const uniqueUser = new User({
//       userName: 'PepoTest',
//       name: 'Rick',
//       hashPassword,
//     });

//     await uniqueUser.save();
//   });

//   test('Add user sucess', async () => {
//     const initialUsers = await helper.usersDb();

//     const newUser = {
//       userName: 'UserTest',
//       name: 'testBlog',
//       password: 'hola123',
//     };

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     const actualUsers = await helper.usersDb();

//     assert.strictEqual(actualUsers.length, initialUsers.length + 1);
//   });

//   test('a user repeated can not be added', async () => {
//     const initialUsers = await helper.usersDb();

//     const newUser = {
//       userName: 'PepoTest',
//       name: 'Rick',
//       password: '123',
//     };

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/);

//     const usersUpdate = await helper.usersDb();

//     assert.strictEqual(usersUpdate.length, initialUsers.length);
//   });

//   test('user without username or password can not be created', async () => {
//     const usersAtStart = await helper.usersDb();

//     const user = {
//       name: 'Diana',
//       password: 'Dedo',
//     };

//     const result = await api
//       .post('/api/users')
//       .send(user)
//       .expect(400)
//       .expect('Content-Type', /application\/json/);

//     const usersAtEnd = await helper.usersDb();

//     assert.strictEqual(usersAtEnd.length, usersAtStart.length);
//     assert(result.body.error.includes('No username or password'));
//   });

//   test('user must be at last three characters', async () => {
//     const usersAtStart = await helper.usersDb();

//     const user = {
//       userName: 'Diana',
//       name: 'Diana',
//       password: 'D',
//     };

//     const response = await api
//       .post('/api/users')
//       .send(user)
//       .expect(400)
//       .expect('Content-Type', /application\/json/);

//     const usersAtEnd = await helper.usersDb();

//     assert.strictEqual(usersAtEnd.length, usersAtStart.length);
//     assert(response.body.error.includes('userName or password must be at least three character'));
//   });

//   test('a blog with a user assigned exists', async () => {
//     const hashPassword = await bcrypt.hash('bilurin', 10);

//     const newUser = new User({
//       userName: 'Test',
//       name: 'Pepsi',
//       hashPassword,
//     });

//     await newUser.save();

//     const blogWithUserId = {
//       title: 'prueba-test',
//       author: 'Prueba 04/04',
//       url: 'www.pepito.com',
//       likes: 5000,
//       id: `${newUser._id}`,
//     };

//     const blogSaved = await api
//       .post('/api/blogs')
//       .send(blogWithUserId)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     assert(blogSaved.body.author.includes('Prueba 04/04'));
//   });
// });

describe('Unit tests for Users login', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const hashPassword = await bcrypt.hash('345', 10);

    const uniqueUser = new User({
      userName: 'Pepe',
      name: 'Ricardo',
      hashPassword,
    });

    await uniqueUser.save();
  });

  test('a user can login and generate token', async () => {
    const usersAtStart = await helper.blogDb();

    const userToLogin = {
      userName: 'Pepe',
      password: '345',
    };

    await api
      .post('/api/login')
      .send(userToLogin)
      .expect(200)
      .expect('content-type', /application\/json/);
  });
});

after(async () => {
  await mongoose.connection.close();
});
