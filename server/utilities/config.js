require('dotenv').config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const MONGO_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_URL_v2
    : process.env.MONGO_DEV_URL;

module.exports = {
  MONGO_URL,
  PORT,
  SECRET,
};
