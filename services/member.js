const Member = require('../models/Member');

const findMembersByCommittee = (committeeId) => {
  return Member.find({ committeeId })
    .sort({ serialNumber: 1 })
    .populate('pharmacistId');
};

const createNewMember = async (data) => {
  const member = new Member({ ...data });

  return member.save();
};

module.exports = { findMembersByCommittee, createNewMember };
