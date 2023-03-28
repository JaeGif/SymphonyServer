const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/User');
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  username: 'TestedUser',
  isModerator: false,
  avatar: 'none',
};
const registerUser = {
  firstName: 'John',
  lastName: 'Register',
  username: 'RegisterCheck',
  isModerator: false,
  avatar: '',
  password: 'superSecretPass66',
};

// delete users from test base, then reinit a new user
beforeEach(async () => {
  return await User.deleteMany({});
});

test('user can be registered successfully', async () => {
  await api.post('/register').send(registerUser).expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
