const userAuthorize = (req, res, next) => {
  const { regNumber } = req.params;

  if (
    !req.user?.roles?.includes('SUPER_ADMIN') &&
    !req.user?.roles?.includes('ADMIN') &&
    (req.user.accountStatus !== 'ACTIVE' || req.user.regNumber !== regNumber)
  ) {
    return res
      .status(401)
      .json({ text: 'Unauthorized!', bn_text: 'অননুমোদিত' });
  }

  next();
};

module.exports = userAuthorize;
