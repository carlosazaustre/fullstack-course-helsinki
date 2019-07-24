const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

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

    response.status(200).send(user.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;
