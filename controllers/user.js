const userService = require('../services/user');
const error = require('../utils/error');

/**
 *
 */
const getUsers = async (_req, res, next) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

/**
 *
 */
const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty('_id', userId);

    if (!user) {
      throw error('User not found!', 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

/**
 * TODO:
 */
const postUser = async (_req, res, next) => {};

/**
 *
 */
const putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { adminDetails, accountStatus, roles } = req.body;

  try {
    const user = await userService.updateUser(userId, {
      adminDetails,
      accountStatus,
      roles,
    });

    if (!user) {
      throw error('User not found!', 404);
    }

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

/**
 *
 */
const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { adminDetails, accountStatus, roles } = req.body;

  try {
    const user = await userService.findUserByProperty('_id', userId);

    if (!user) {
      throw error('User not found!', 404);
    }

    user.adminDetails = adminDetails ?? user.adminDetails;
    user.accountStatus = accountStatus ?? user.accountStatus;
    user.roles = roles ?? user.roles;

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

/**
 *
 */
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty('_id', userId);

    if (!user) {
      throw error('User not found!', 404);
    }

    await user.remove();
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  postUser,
  getUserById,
  putUserById,
  patchUserById,
  deleteUserById,
};
