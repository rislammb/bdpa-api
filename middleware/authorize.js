const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const { getPopulatedUser } = require('../utils/user');

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await userService.findUserByProperty('_id', decoded?._id);

      if (user && decoded.exp > new Date().getTime() / 1000) {
        req.user = getPopulatedUser(user);
      }
    }

    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

module.exports = authorize;
