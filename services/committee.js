const { getPopulatedMembers } = require('../utils/member');
const Committee = require('../models/Committee');
const error = require('../utils/error');
const memberService = require('./member');

const findCommittees = () => {
  return Committee.find().sort({ indexNumber: 1, committeeTitle: 1 });
};

const findCommitteeByPath = (committeePath) => {
  return Committee.findOne({ committeePath }).then(async (data) => {
    if (data) {
      const members = await memberService.findMembersByCommittee(data.id);

      return { ...data._doc, members: getPopulatedMembers(members) };
    } else return null;
  });
};

const findCommitteeById = (committeeId) => {
  return Committee.findById(committeeId).then(async (data) => {
    if (data) {
      const members = await memberService.findMembersByCommittee(data.id);

      return { ...data._doc, members: getPopulatedMembers(members) };
    } else return null;
  });
};

const findCommitteeOnlyByPath = (committeePath) => {
  return Committee.findOne({ committeePath });
};

const createNewCommittee = async (data) => {
  const {
    committeeTitle,
    committeePath,
    indexNumber,
    workHasStarted,
    willExpire,
    members,
  } = data;

  let committee = await findCommitteeByPath(committeePath);
  if (committee) {
    throw error('Committee already exists!', 400);
  }

  committee = new Committee({
    committeeTitle,
    committeePath,
    indexNumber,
    workHasStarted,
    willExpire,
  });

  for (const member of members) {
    try {
      const resMember = await memberService.createNewMember({
        committeeId: committee._id,
        ...member,
      });

      committee.members.push(resMember.id);
    } catch (e) {
      throw error('Sometnings went wrong!');
    }
  }

  return committee.save();
};

const deleteCommitteeById = async (id) => {
  await memberService.deleteMembersByCommitteeId(id);

  return Committee.findByIdAndDelete(id);
};

module.exports = {
  findCommittees,
  findCommitteeByPath,
  findCommitteeById,
  findCommitteeOnlyByPath,
  createNewCommittee,
  deleteCommitteeById,
};
