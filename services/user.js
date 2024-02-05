const mongoose = require('mongoose');
const { jsonError } = require('../utils/error');

const User = require('../models/User');

const findUsers = async (req) => {
  const {
    page = 1,
    page_size = 30,
    account_status = 'ALL',
    query = '',
  } = req.query;

  const skipAmount = (page - 1) * page_size;

  const findOptions = {
    $or: account_status === 'ALL' ? [{}] : [{ accountStatus: account_status }],
    $and: [
      {
        $or: [
          { regNumber: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
    ],
  };

  const users = await User.find(findOptions)
    .skip(skipAmount)
    .limit(page_size)
    .exec();

  const usersCount = await User.countDocuments(findOptions);
  const totalUsersCount = await User.countDocuments();
  const isNext = usersCount > skipAmount + users.length;

  return { users, usersCount, totalUsersCount, isNext };
};

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    if (mongoose.isValidObjectId(value)) {
      return User.findById(value).populate('pharmacistId');
    }
    throw jsonError(
      {
        text: 'User Id is not valid MongoDB Object Id!',
        bn_text: 'ইউজার আইডি সঠিক MongoDB অবজেক্ট আইডি নয়!',
      },
      400
    );
  }

  return User.findOne({ [key]: value }).populate('pharmacistId');
};

const createNewUser = ({
  email,
  emailToken,
  regNumber,
  pharmacistId,
  accountStatus,
  roles,
  adminDetails,
}) => {
  const user = new User({
    email,
    emailToken,
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
