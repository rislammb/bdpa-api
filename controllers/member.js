const memberService = require('../services/member');
const committeeService = require('../services/committee');
const { error } = require('../utils/error');
const {
  validatePostMember,
  getPopulatedMembers,
  getPopulatedMember,
  validatePatchMember,
} = require('../utils/member');

const getMembers = async (_req, res, next) => {
  try {
    const members = await memberService.findMembers();

    res.status(200).json(members);
  } catch (e) {
    next(e);
  }
};

const getMembersByCommitteeId = async (req, res, next) => {
  const { committeeId } = req.params;

  try {
    const members = await memberService.findMembersByCommittee(committeeId);

    res.status(200).json(getPopulatedMembers(members));
  } catch (e) {
    next(e);
  }
};

const getMemberById = async (req, res, next) => {
  const { memberId } = req.params;

  try {
    const member = await memberService.findMemberById(memberId);

    res.status(200).json(getPopulatedMember(member));
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
    const committee = await committeeService.findCommitteeOnlyById(
      data.committeeId
    );

    if (!committee) {
      res.status(404).json({
        text: 'Committee not found!',
        bn_text: 'কমিটি খুঁজে পাওয়া যায় নি!',
      });
    }

    const member = await memberService.createNewMember(data);
    committee.members.push(member.id);

    await committee.save();

    res.status(201).json(member);
  } catch (e) {
    next(e);
  }
};

const patchMemberById = async (req, res, next) => {
  const { memberId } = req.params;

  try {
    const member = await memberService.findMemberById(memberId);

    if (!member) {
      res.status(404).json({
        text: 'Committee Member not found!',
        bn_text: 'কমিটির সদস্য খুঁজে পাওয়া যায় নি!',
      });
    }

    const { valid, data } = validatePatchMember(req.body);

    if (!valid) {
      return res.status(400).json(data);
    }

    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => (member[key] = data[key]));
      await member.save();
    }

    res.status(200).json(member);
  } catch (e) {
    next(e);
  }
};

const deleteMembersByCommitteeId = async (req, res, next) => {
  const { committeeId } = req.params;

  try {
    await memberService.deleteMembersByCommitteeId(committeeId);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const deleteMemberById = async (req, res, next) => {
  const { memberId } = req.params;

  try {
    const member = await memberService.findMemberById(memberId);

    if (!member) {
      res.status(404).json({
        text: 'Committee Member not found!',
        bn_text: 'কমিটির সদস্য খুঁজে পাওয়া যায় নি!',
      });
    }

    const committee = await committeeService.findCommitteeOnlyById(
      member.committeeId
    );

    committee.members = committee.members.filter(
      (m) => m.toString() !== member.id
    );

    await committee.save();

    await member.remove();

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMembers,
  postMember,
  getMembersByCommitteeId,
  getMemberById,
  patchMemberById,
  deleteMembersByCommitteeId,
  deleteMemberById,
};
