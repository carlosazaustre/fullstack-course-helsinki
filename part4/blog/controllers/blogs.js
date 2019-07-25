/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

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
  const { body, token } = request;

  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
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
    const { token, params } = request;
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(params.id);
    const user = await User.findById(decodedToken.id);
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'only the creator user can deleted their blogs' });
    }
    await Blog.findByIdAndRemove(params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
