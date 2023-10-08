const mongoose = require('mongoose');
const { getBnAreaInfo } = require('./pharmacist');

const validatePostMembers = (members) => {
  const error = {};
  const newMembers = [];

  if (!members) {
    // error.main = 'Committee members list must not be empty!';
    error.main = 'কমিটির সদস্যদের তালিকা থাকতে হবে!';
  } else if (!Array.isArray(members)) {
    // error.main = 'Committee member list type must be an array!';
    error.main = 'কমিটির সদস্য তালিকার ধরন অবশ্যই অ্যারে হতে হবে';
  } else if (members.length < 1) {
    // error.main = 'Committee members list must not be empty!';
    error.main = 'কমিটির সদস্যদের তালিকা থাকতে হবে!';
  } else {
    members.forEach((member, index) => {
      error[index] = {};
      if (typeof member !== 'object') {
        // error[index].type = 'Committee member type must be an object!';
        error[index].type = 'কমিটির সদস্যের ধরন অবজেক্ট হতে হবে!';
      }

      if (!member.pharmacistId) {
        // error[index].pharmacistId = 'Pharmacist ID must not be empty!';
        error[index].pharmacistId = 'ফার্মাসিস্ট আইডি থাকতে হবে!';
      } else if (!mongoose.isValidObjectId(member.pharmacistId)) {
        // error[index].pharmacistId =
        //   'Pharmacist ID type must be valid object ID!';
        error[index].pharmacistId =
          'ফার্মাসিস্ট আইডির ধরন সঠিক অবজেক্ট আইডি নয়!';
      }

      if (!member.postName) {
        // error[index].postName = 'Committee post name must not be empty!';
        error[index].postName = 'কমিটির পদবী থাকতে হবে!';
      } else if (typeof member.postName !== 'string') {
        // error[index].postName = 'Committee post name type must be string!';
        error[index].postName = 'কমিটির পদবীর ধরন স্ট্রিং হতে হবে!';
      }

      if (!member.serialNumber) {
        // error[index].serialNumber =
        //   'Committee serial number must not be empty!';
        error[index].serialNumber = 'ক্রমিক নেই!';
      } else if (typeof member.serialNumber !== 'string') {
        // error[index].serialNumber =
        //   'Committee serial number type must be string!';
        error[index].serialNumber = 'স্ট্রিং হবে!';
      }

      if (Object.keys(error[index]).length === 0) {
        delete error[index];
      }
      newMembers.push(member);
    });
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newMembers,
  };
};

const validatePostMember = ({
  committeeId,
  pharmacistId,
  postName,
  serialNumber,
}) => {
  const error = {};
  const newMember = {};

  if (!committeeId) {
    // error.committeeId = 'Committee ID must not be empty!';
    error.committeeId = 'কমিটির আইডি থাকতে হবে!';
  } else if (!mongoose.isValidObjectId(committeeId)) {
    // error.committeeId = 'Committee ID type must be valid object ID!';
    error.committeeId = 'কমিটি আইডির ধরন সঠিক অবজেক্ট আইডি নয়!!';
  } else {
    newMember.committeeId = committeeId;
  }

  if (!pharmacistId) {
    // error.pharmacistId = 'Pharmacist ID must not be empty!';
    error.pharmacistId = 'ফার্মাসিস্ট আইডি থাকতে হবে!';
  } else if (!mongoose.isValidObjectId(pharmacistId)) {
    // error.pharmacistId = 'Pharmacist ID type must be valid object ID!';
    error.pharmacistId = 'ফার্মাসিস্ট আইডির ধরন সঠিক অবজেক্ট আইডি নয়!';
  } else {
    newMember.pharmacistId = pharmacistId;
  }

  if (!postName) {
    // error.postName = 'Committee post name must not be empty!';
    error.postName = 'কমিটির পদবী থাকতে হবে!';
  } else if (typeof postName !== 'string') {
    // error.postName = 'Committee post name type must be string!';
    error.postName = 'কমিটির পদবীর ধরন স্ট্রিং হতে হবে!';
  } else {
    newMember.postName = postName;
  }

  if (!serialNumber) {
    // error.serialNumber = 'Committee serial number must not be empty!';
    error.serialNumber = 'ক্রমিক নেই!';
  } else if (typeof serialNumber !== 'string') {
    // error.serialNumber = 'Committee serial number type must be string!';
    error.serialNumber = 'স্ট্রিং হবে!';
  } else {
    newMember.serialNumber = serialNumber;
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newMember,
  };
};

const validatePatchMember = ({
  committeeId,
  pharmacistId,
  postName,
  serialNumber,
}) => {
  const error = {};
  const newMember = {};

  if (committeeId) {
    if (!mongoose.isValidObjectId(committeeId)) {
      error.committeeId = 'Committee ID type must be valid object ID!';
    } else {
      newMember.committeeId = committeeId;
    }
  }

  if (pharmacistId) {
    if (!mongoose.isValidObjectId(pharmacistId)) {
      error.pharmacistId = 'Pharmacist ID type must be valid object ID!';
    } else {
      newMember.pharmacistId = pharmacistId;
    }
  }

  if (postName) {
    if (typeof postName !== 'string') {
      error.postName = 'Committee post name type must be string!';
    } else {
      newMember.postName = postName;
    }
  }

  if (serialNumber) {
    if (typeof serialNumber !== 'string') {
      error.serialNumber = 'Committee serial number type must be string!';
    } else {
      newMember.serialNumber = serialNumber;
    }
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newMember,
  };
};

const getPopulatedMembers = (members) => {
  const resMembers = [];

  if (members.length > 0) {
    members.forEach((member) => resMembers.push(getPopulatedMember(member)));
  }

  return resMembers;
};

const getPopulatedMember = (member) => {
  const pharmacistInfo = member.pharmacistId && {
    name: member.pharmacistId.name,
    bn_name: member.pharmacistId.bn_name,
    mobile: member.pharmacistId.mobile,
    regNumber: member.pharmacistId.regNumber,
    posting: getBnAreaInfo(member.pharmacistId, 'posting'),
  };

  return {
    _id: member.id,
    committeeId: member.committeeId,
    serialNumber: member.serialNumber,
    postName: member.postName,
    ...pharmacistInfo,
  };
};

module.exports = {
  validatePostMembers,
  validatePostMember,
  validatePatchMember,
  getPopulatedMembers,
  getPopulatedMember,
};
