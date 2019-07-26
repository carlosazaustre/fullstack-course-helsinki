const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const saltRounds = 10;

    if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 characters long' });
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
      });
    response.json(users.map(u => u.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
