const Member = require('../models/Member');

const findMembers = () => {
  return Member.find().sort({ committeeId: 1 });
};

const findMembersByCommitteePath = (const findMembersByCommittee = (committeePath) => {
  return Member.find({ committeePath })
    .sort({ serialNumber: 1 })
    .populate('pharmacistId');
};

const findMembersByCommittee = (committeeId) => {
  return Member.find({ committeeId })
    .sort({ serialNumber: 1 })
    .populate('pharmacistId');
};

const findMemberById = (memberId) => {
  return Member.findById(memberId).populate('pharmacistId');
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
  findMembersByCommitteePath,
  findMembersByCommittee,
  findMemberById,
  createNewMember,
  deleteMembersByCommitteeId,
};
