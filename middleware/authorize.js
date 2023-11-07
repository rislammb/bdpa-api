const authorize = (req, res, next) => {
  if (!req.body.user) {
    return res
      .status(401)
      .json({ text: 'Unauthorized!', bn_text: 'অননুমোদিত' });
  }

  next();
};

module.exports = authorize;
