const User = require('../models/User');

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    return User.findById(value);
  }

  return User.findOne({ [key]: value });
};

const createNewUser = ({
  email,
  password,
  regNumber,
  accountStatus,
  roles,
  adminDetails,
}) => {
  const user = new User({
    email,
    password,
    regNumber,
    accountStatus: accountStatus ?? 'PENDING',
    roles: roles ?? 'USER',
    adminDetails,
  });

  return user.save();
};

module.exports = { findUsers, findUserByProperty, createNewUser };
