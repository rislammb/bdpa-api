const { getPopulatedMembers } = require('../utils/member');
const Committee = require('../models/Committee');
const { jsonError } = require('../utils/error');
const memberService = require('./member');

const findCommittees = (req) => {
    const {
    pageNumber = 1,
    pageSize = 15,
    query = '',
  } = req.query;

  const skipAmount = (pageNumber - 1) * pageSize;
  
  return Committee.find({
    $or: [
      { committeeTitle: { $regex: req.query.query, $options: 'i' } },
      { bn_committeeTitle: { $regex: req.query.query, $options: 'i' } },
    ],
  })
  .sort({ indexNumber: 1, committeeTitle: 1 })
  .skip(skipAmount)
  .limit(pageSize)
  .exec();
};

const findCommitteeByPath = (committeePath) => {
  return Committee.findOne({ committeePath }).then(async (data) => {
    if (data) {
      const members = await memberService.findMembersByCommittee(data._id);

      return { ...data._doc, members: getPopulatedMembers(members) };
    } else return null;
  });
};

const findCommitteeById = (committeeId) => {
  return Committee.findById(committeeId).then(async (data) => {
    if (data) {
      const members = await memberService.findMembersByCommittee(committeeId);

      return { ...data._doc, members: getPopulatedMembers(members) };
    } else return null;
  });
};

const findCommitteeOnlyByPath = (committeePath) => {
  return Committee.findOne({ committeePath });
};

const findCommitteeOnlyById = (id) => {
  return Committee.findById(id);
};

const createNewCommittee = async (data) => {
  const {
    committeeTitle,
    bn_committeeTitle,
    committeePath,
    indexNumber,
    workHasStarted,
    willExpire,
    members,
  } = data;

  let committee = await findCommitteeByPath(committeePath);
  if (committee) {
    throw jsonError(
      {
        text: 'Committee already exists!',
        bn_text: 'এই কমিটি আছে!',
      },
      400
    );
  }

  committee = new Committee({
    committeeTitle,
    committeePath,
    bn_committeeTitle,
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
      throw jsonError(
        {
          text: 'Sometnings went wrong!',
          bn_text: 'কিছু একটা সমস্যা হয়েছে!',
        },
        400
      );
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
  findCommitteeOnlyById,
  createNewCommittee,
  deleteCommitteeById,
};
