const dummy = (blogs) => 1;

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Pepo',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Pepo',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 458,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 20000,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Pepo',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Pepo',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Pepo',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 3,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Pepo',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

// eslint-disable-next-line max-len
const totalLikes = (blogs) => (blogs.length === 0 ? 0 : blogs.reduce((acumulator, actual) => acumulator + actual.likes, 0));

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 'No se ha pasado ningún blog para evaluar';

  return blogs.reduce((previous, actual) => (actual.likes >= previous.likes ? actual : previous));
};

const mostBlogs = (blogs) => {
  const authors = new Set();
  const arrayAuthors = [];

  blogs.forEach((blog) => authors.add(blog.author));

  authors.forEach((author) => {
    arrayAuthors.push({
      name: author,
      blogs: 0,
    });
  });

  blogs.forEach((blog) => {
    if (authors.has(blog.author)) {
      arrayAuthors.forEach((author) => {
        if (author.name === blog.author) {
          // eslint-disable-next-line no-param-reassign
          author.blogs += 1;
        }
      });
    }
  });

  const winner = arrayAuthors.reduce(
    (accumulator, actual) => {
      if (actual.blogs >= accumulator.blogs) {
        accumulator.author = actual.name;
        accumulator.blogs = actual.blogs;
      }

      return accumulator;
    },
    { author: '', blogs: 0 }
  );

  return winner;
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((accumulator, { author, likes }) => {
    accumulator[author] = (accumulator[author] || 0) + likes;
    return accumulator;
  }, {});

  const winner = Object.keys(authors).reduce(
    (accumulator, author) => {
      if (authors[author] > accumulator.likes) {
        accumulator.author = author;
        accumulator.likes = authors[author];
      }
      return accumulator;
    },
    { author: '', likes: 0 }
  );

  return winner;
};
console.log(favoriteBlog(listWithOneBlog));
console.log(mostBlogs(listWithOneBlog));
console.log(totalLikes(listWithOneBlog));
console.log(mostLikes(listWithOneBlog));

export { dummy, totalLikes, favoriteBlog };
