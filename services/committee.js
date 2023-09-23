const { getAreaInfo } = require('../helpers/utilities');
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

      const resMembers = [];
      if (members.length > 0) {
        members.forEach((member) => {
          resMembers.push({
            id: member.id,
            committeeId: member.committeeId,
            serialNumber: member.serialNumber,
            postName: member.postName,
            name: member.pharmacistId.name,
            bn_name: member.pharmacistId.bn_name,
            mobile: member.pharmacistId.mobile,
            regNumber: member.pharmacistId.regNumber,
            posting: getAreaInfo(member.pharmacistId, 'posting'),
          });
        });
      }

      return { ...data._doc, members: resMembers };
    } else return null;
  });
};

const createNewCommittee = async (data) => {
  let committee = await findCommitteeByPath(data.committeePath);
  if (committee) {
    throw error('Committee already exists!', 400);
  }

  committee = new Committee({ ...data });

  data.members?.forEach(async (member) => {
    await memberService.createNewMember({
      committeeId: committee._id,
      ...member,
    });
  });

  return committee.save();
};

const deleteCommitteeById = async (id) => {
  await memberService.deleteMembersByCommitteeId(id);

  return Committee.findByIdAndDelete(id);
};

module.exports = {
  findCommittees,
  findCommitteeByPath,
  createNewCommittee,
  deleteCommitteeById,
};
