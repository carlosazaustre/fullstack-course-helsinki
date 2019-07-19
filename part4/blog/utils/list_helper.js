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

module.exports = {
  dummy,
  totalLikes,
};
