const Member = require('../models/Member');

const findMembers = () => {
  return Member.find();
};

const findMembersByCommittee = (committeeId) => {
  return Member.find({ committeeId })
    .sort({ serialNumber: 1 })
    .populate('pharmacistId');
};

const createNewMember = async (data) => {
  const member = new Member({ ...data });

  return member.save();
};

const deleteMembersByCommitteeId = (id) => {
  return Member.deleteMany({ committeeId: id });
};

module.exports = {
  findMembers,
  findMembersByCommittee,
  createNewMember,
  deleteMembersByCommitteeId,
};
