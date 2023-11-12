const userService = require('../services/user');
const { getPopulatedUser } = require('../utils/user');

/**
 *
 */
const getUsers = async (_req, res, next) => {
  try {
    let users = await userService.findUsers();

    users = users.map((user) => getPopulatedUser(user));

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
    let user = await userService.findUserByProperty('_id', userId);

    if (!user) {
      res.status(404).json({
        text: 'User not found!',
        bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
      });
    }

    user = getPopulatedUser(user);

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
    let user = await userService.updateUser(userId, {
      adminDetails,
      accountStatus,
      roles,
    });

    if (!user) {
      res.status(404).json({
        text: 'User not found!',
        bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
      });
    }

    user = getPopulatedUser(user);

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

  const { password, isVerified, adminDetails, accountStatus, roles } = req.body;

  try {
    let user = await userService.findUserByProperty('_id', userId);

    if (!user) {
      res.status(404).json({
        text: 'User not found!',
        bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
      });
    }

    if (password !== undefined) user.password = password;
    if (isVerified !== undefined) user.isVerified = isVerified;
    if (adminDetails !== undefined) user.adminDetails = adminDetails;
    if (accountStatus !== undefined) user.accountStatus = accountStatus;
    if (roles !== undefined) user.roles = roles;

    await user.save();

    user = getPopulatedUser(user);

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
      res.status(404).json({
        text: 'User not found!',
        bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
      });
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
