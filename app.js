import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import blogRouter from './controllers/blogs.js';
import config from './utils/config.js';

const app = express();

mongoose.set('strictQuery', false);
console.log('Connecting to Mongoose...');

mongoose
  .connect(config.MONGO_URI)
  .then((result) => {
    console.log('Connected to MongoDb');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogRouter);

// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.send(blogs);
//   });
// });

// app.post('/api/blogs', (request, response) => {
//   const { body } = request;

//   console.log('Request body:', body);

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   });

//   blog
//     .save()
//     .then((result) => {
//       console.log('Blog guardado');
//       response.json(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
