const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce((sum, item) => sum + item);
};

const favoriteBlog = (blogs) => {
  let likes = 0;
  let mostLiked = {};

  blogs.forEach((blog) => {
    if (blog.likes > likes) {
      // eslint-disable-next-line prefer-destructuring
      likes = blog.likes;
      mostLiked = blog;
    }
  });
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  const uniqueAuthors = {};

  blogs.forEach((blog) => {
    if (!uniqueAuthors[blog.author]) {
      uniqueAuthors[blog.author] = 1;
    } else {
      uniqueAuthors[blog.author] += 1;
    }
  });

  const mostAuthorBlogs = Object
    .entries(uniqueAuthors)
    .sort((a, b) => b[1] - a[1])[0];

  return {
    author: mostAuthorBlogs[0],
    blogs: mostAuthorBlogs[1],
  };
};

const mostLikes = (blogs) => {
  const uniqueAuthors = {};

  blogs.forEach((blog) => {
    if (!uniqueAuthors[blog.author]) {
      uniqueAuthors[blog.author] = blog.likes;
    } else {
      uniqueAuthors[blog.author] += blog.likes;
    }
  });

  const mostAuthorLikes = Object
    .entries(uniqueAuthors)
    .sort((a, b) => b[1] - a[1])[0];

  return {
    author: mostAuthorLikes[0],
    likes: mostAuthorLikes[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
