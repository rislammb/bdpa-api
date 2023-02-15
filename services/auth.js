const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const { findUserByProperty, createNewUser } = require('./user');

const registerService = async ({
  email,
  password,
  regNumber,
  pharmacistId,
  accountStatus,
  roles,
  adminDetails,
}) => {
  const user = await findUserByProperty('email', email);
  if (user) throw error('User already exist!', 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({
    email,
    password: hash,
    regNumber,
    pharmacistId,
    accountStatus,
    roles,
    adminDetails,
  });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty('email', email);

  if (!user) throw error('Invalid credentials!', 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error('Invalid credentials!', 400);

  const payload = {
    _id: user._id,
    email: user.email,
    regNumber: user.regNumber,
    roles: user.roles,
    accountStatus: user.accountStatus,
    adminDetails: user.adminDetails,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
};

module.exports = { registerService, loginService };
