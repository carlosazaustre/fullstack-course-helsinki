/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const user = await User.findOne({ username: body.username });

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: 'invalid username or password' });
    }

    const userForToken = { username: user.username, id: user._id };
    const token = jwt.sign(userForToken, config.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;
