const adminAuthorize = (req, res, next) => {
  if (
    !req.user?.roles?.includes('SUPER_ADMIN') &&
    !req.user?.roles?.includes('ADMIN')
  ) {
    return res
      .status(401)
      .json({ text: 'Unauthorized!', bn_text: 'অননুমোদিত' });
  }

  next();
};

module.exports = adminAuthorize;
