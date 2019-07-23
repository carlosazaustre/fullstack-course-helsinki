const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const blog = new Blog(body);
    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blogToUpdate = await Blog.findById(request.params.id);
    const dataToUpdate = {
      likes: blogToUpdate.likes + 1,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      dataToUpdate,
      { new: true },
    );
    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
})

module.exports = blogsRouter;
