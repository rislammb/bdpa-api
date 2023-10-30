const mongoose = require('mongoose');
const { jsonError } = require('../utils/error');

const User = require('../models/User');

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    if (mongoose.isValidObjectId(value)) {
      return User.findById(value);
    }
    throw jsonError(
      {
        text: 'User Id is not valid MongoDB Object Id!',
        bn_text: 'ইউজার আইডি সঠিক MongoDB অবজেক্ট আইডি নয়!',
      },
      400
    );
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
    throw jsonError(
      {
        text: 'User Id is not valid MongoDB Object Id!',
        bn_text: 'ইউজার আইডি সঠিক MongoDB অবজেক্ট আইডি নয়!',
      },
      400
    );
  }

  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = { findUsers, findUserByProperty, createNewUser, updateUser };
