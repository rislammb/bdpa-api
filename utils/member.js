const mongoose = require('mongoose');
const { getBnAreaInfo } = require('./pharmacist');

const validatePostMembers = (members) => {
  const error = {};
  const newMembers = [];

  if (!members) {
    error.main = 'Committee members list must not be empty!';
  } else if (!Array.isArray(members)) {
    error.main = 'Committee member list type must be an array!';
  } else if (members.length < 1) {
    error.main = 'Committee member list must not be empty!';
  } else {
    members.forEach((member, index) => {
      error[index] = {};
      if (typeof member !== 'object') {
        error[index].type = 'Committee member type must be an object!';
      }

      if (!member.pharmacistId) {
        error[index].pharmacistId = 'Pharmacist ID must not be empty!';
      } else if (!mongoose.isValidObjectId(member.pharmacistId)) {
        error[index].pharmacistId =
          'Pharmacist ID type must be valid object ID!';
      }

      if (!member.postName) {
        error[index].postName = 'Committee post name must not be empty!';
      } else if (typeof member.postName !== 'string') {
        error[index].postName = 'Committee post name type must be string!';
      }

      if (!member.serialNumber) {
        error[index].serialNumber =
          'Committee serial number must not be empty!';
      } else if (typeof member.serialNumber !== 'string') {
        error[index].serialNumber =
          'Committee serial number type must be string!';
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
    error.committeeId = 'Committee ID must not be empty!';
  } else if (!mongoose.isValidObjectId(committeeId)) {
    error.committeeId = 'Committee ID type must be valid object ID!';
  } else {
    newMember.committeeId = committeeId;
  }

  if (!pharmacistId) {
    error.pharmacistId = 'Pharmacist ID must not be empty!';
  } else if (!mongoose.isValidObjectId(pharmacistId)) {
    error.pharmacistId = 'Pharmacist ID type must be valid object ID!';
  } else {
    newMember.pharmacistId = pharmacistId;
  }

  if (!postName) {
    error.postName = 'Committee post name must not be empty!';
  } else if (typeof postName !== 'string') {
    error.postName = 'Committee post name type must be string!';
  } else {
    newMember.postName = postName;
  }

  if (!serialNumber) {
    error.serialNumber = 'Committee serial number must not be empty!';
  } else if (typeof serialNumber !== 'string') {
    error.serialNumber = 'Committee serial number type must be string!';
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
