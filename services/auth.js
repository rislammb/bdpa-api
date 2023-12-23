const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jsonError } = require('../utils/error');
const { findUserByProperty, createNewUser, updateUser } = require('./user');

const register = async ({
  email,
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

  return createNewUser({
    email,
    emailToken: crypto.randomBytes(64).toString('hex'),
    regNumber,
    pharmacistId,
    accountStatus,
    roles,
    adminDetails,
  });
};

const resetPassword = async (email) => {
  const user = await findUserByProperty('email', email);

  if (!user) {
    throw jsonError(
      {
        text: 'User not found!',
        bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
      },
      404
    );
  } else if (!user.isVerified) {
    throw jsonError(
      {
        text: 'The email has not been verified!',
        bn_text: 'ইমেইল যাচাই করা হয়নি!',
      },
      400
    );
  } else if (!user.password) {
    throw jsonError(
      {
        text: 'The password has not been set!',
        bn_text: 'পাসওয়ার্ড সেট করা হয়নি!',
      },
      400
    );
  } else {
    return updateUser(user.id, {
      emailToken: crypto.randomBytes(64).toString('hex'),
      password: null,
    });
  }
};

const login = async ({ email, password }) => {
  const user = await findUserByProperty('email', email);

  if (!user) {
    throw jsonError(
      {
        text: 'User not found!',
        bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
      },
      404
    );
  } else if (!user.isVerified) {
    throw jsonError(
      {
        text: 'The email has not been verified!',
        bn_text: 'ইমেইল যাচাই করা হয়নি!',
      },
      400
    );
  } else if (!user.password) {
    throw jsonError(
      {
        text: 'The password has not been set!',
        bn_text: 'পাসওয়ার্ড সেট করা হয়নি!',
      },
      400
    );
  } else {
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
      pharmacistId: user.pharmacistId,
      roles: user.roles,
      accountStatus: user.accountStatus,
      adminDetails: user.adminDetails,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
};

module.exports = { register, login, resetPassword };
