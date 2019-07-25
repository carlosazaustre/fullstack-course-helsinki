/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {
        username: 1,
        name: 1,
      });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const user = await User.findById(body.user);
    const blog = new Blog({
      ...body,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
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
