const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jsonError } = require('../utils/error');
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
  if (user)
    throw jsonError(
      {
        text: 'User already exists!',
        bn_text: 'এই ইউজার আছে!',
      },
      400
    );

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

  if (!user)
    throw jsonError(
      {
        text: 'Invalid credentials!',
        bn_text: 'অকার্যকর পরিপয়পত্র!',
      },
      400
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw jsonError(
      {
        text: 'Invalid credentials!',
        bn_text: 'অকার্যকর পরিপয়পত্র!',
      },
      400
    );

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
