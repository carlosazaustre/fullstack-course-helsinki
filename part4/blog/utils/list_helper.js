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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
