const jwt = require('jsonwebtoken');
const userService = require('../services/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized!', bn_text: 'অননুমোদিত' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userService.findUserByProperty('_id', decoded?._id);

    if (!user || decoded.exp < new Date().getTime() / 1000) {
      return res
        .status(401)
        .json({ text: 'Unauthorized!', bn_text: 'অননুমোদিত' });
    }

    req.user = {
      _id: user._id,
      adminDetails: user.adminDetails,
      email: user.email,
      regNumber: user.regNumber,
      imageUrl: user.pharmacistId?.imageUrl ?? '',
      accountStatus: user.accountStatus,
      roles: user.roles,
    };

    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

module.exports = authenticate;
