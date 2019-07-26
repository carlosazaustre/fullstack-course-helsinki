/* eslint-disable no-underscore-dangle */
function _orderArray(originalArray, property, value) {
  const toOrderArray = {};
  originalArray.forEach((item) => {
    if (!toOrderArray[item[property]]) {
      // eslint-disable-next-line no-param-reassign
      toOrderArray[item[property]] = value ? item[value] : 1;
    } else {
      // eslint-disable-next-line no-param-reassign
      toOrderArray[item[property]] += value ? item[value] : 1;
    }
  });

  return Object
    .entries(toOrderArray)
    .sort((a, b) => b[1] - a[1])[0];
}

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
  const mostAuthorBlogs = _orderArray(blogs, 'author');

  return {
    author: mostAuthorBlogs[0],
    blogs: mostAuthorBlogs[1],
  };
};

const mostLikes = (blogs) => {
  const mostAuthorLikes = _orderArray(blogs, 'author', 'likes');

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
