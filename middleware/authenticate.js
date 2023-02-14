const jwt = require('jsonwebtoken');
const userService = require('../services/user');

const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userService.findUserByProperty('_id', decoded?._id);

    if (!user || decoded.exp < new Date().getTime() / 1000) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    delete user._doc.password;
    req.user = user;

    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

module.exports = authenticate;
