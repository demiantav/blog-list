import Blog from '../models/blog.js';

const listBlog = [
  {
    title: 'prueba',
    author: 'Onlines',
    url: 'https://onlines.com.ar/',
    likes: 59,
  },

  {
    title: 'cuchi',
    author: 'Onlin',
    url: 'https://onlines.com.ar/',
    likes: 56549,
  },
];

const blogDb = async () => {
  const result = await Blog.find({});
  return result.map((blog) => blog.toJSON());
};

export default { listBlog, blogDb };
