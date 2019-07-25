require('dotenv').config();

// eslint-disable-next-line prefer-const
let { PORT, MONGODB_URI, SECRET } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
