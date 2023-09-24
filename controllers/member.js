const memberService = require('../services/member');
const { validatePostMember } = require('../utils/member');

const getMembers = async (_req, res, next) => {
  try {
    const members = await memberService.findMembers();

    res.status(200).json(members);
  } catch (e) {
    next(e);
  }
};

const postMember = async (req, res, next) => {
  const { valid, data } = validatePostMember(req.body);

  if (!valid) {
    return res.status(400).json(data);
  }

  try {
    const member = await memberService.createNewMember(data);

    res.status(201).json(member);
  } catch (e) {
    next(e);
  }
};

module.exports = { getMembers, postMember };
