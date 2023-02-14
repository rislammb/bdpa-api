const authorize = (req, res, next) => {
  if (!req.body.user) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  next();
};

module.exports = authorize;
