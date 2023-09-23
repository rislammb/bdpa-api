const { getAreaInfo } = require('../helpers/utilities');
const Committee = require('../models/Committee');
const Member = require('../models/Member');
const error = require('../utils/error');
const { findMembersByCommittee, createNewMember } = require('./member');

const findCommittees = () => {
  return Committee.find().sort({ indexNumber: 1, committeeTitle: 1 });
};

const findCommitteeByPath = async (committeePath) => {
  return Committee.findOne({ committeePath }).then(async (data) => {
    if (data) {
      const members = await findMembersByCommittee(data.id);

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
    await createNewMember({
      committeeId: committee._id,
      ...member,
    });
  });

  return committee.save();
};

module.exports = { findCommittees, findCommitteeByPath, createNewCommittee };
