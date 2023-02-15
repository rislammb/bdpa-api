const mongoose = require('mongoose');
const error = require('../utils/error');

const User = require('../models/User');

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    if (mongoose.isValidObjectId(value)) {
      return User.findById(value);
    }
    throw error('User Id is not valid MongoDB Object Id', 400);
  }

  return User.findOne({ [key]: value });
};

const createNewUser = ({
  email,
  password,
  regNumber,
  pharmacistId,
  accountStatus,
  roles,
  adminDetails,
}) => {
  const user = new User({
    email,
    password,
    regNumber,
    pharmacistId,
    accountStatus: accountStatus ?? 'PENDING',
    roles: roles ?? 'USER',
    adminDetails,
  });

  return user.save();
};

const updateUser = (id, data) => {
  if (!mongoose.isValidObjectId(id)) {
    throw error('User Id is not valid MongoDB Object Id', 400);
  }

  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = { findUsers, findUserByProperty, createNewUser, updateUser };
