const mongoose = require('mongoose');
const { getAreaInfo, getBnAreaInfo } = require('./area');
const { validateStringNumber } = require('./validation');

const validatePostMembers = (members) => {
  const error = {};
  const newMembers = [];

  if (!members) {
    error.main = 'Committee members list must not be empty!';
    error.bn_main = 'কমিটির সদস্যদের তালিকা থাকতে হবে!';
  } else if (!Array.isArray(members)) {
    error.main = 'Committee member list type must be an array!';
    error.bn_main = 'কমিটির সদস্য তালিকার ধরন অবশ্যই অ্যারে হতে হবে';
  } else if (members.length < 1) {
    error.main = 'Committee members list must not be empty!';
    error.bn_main = 'কমিটির সদস্যদের তালিকা থাকতে হবে!';
  } else {
    members.forEach((member, index) => {
      error[index] = {};
      if (typeof member !== 'object') {
        error[index].type = {
          text: 'Committee member type must be an object!',
          bn_text: 'কমিটির সদস্যের ধরন অবজেক্ট হতে হবে!',
        };
      }

      if (!member.pharmacistId) {
        error[index].pharmacistId = {
          text: 'Pharmacist ID must not be empty!',
          bn_text: 'ফার্মাসিস্ট আইডি থাকতে হবে!',
        };
      } else if (!mongoose.isValidObjectId(member.pharmacistId)) {
        error[index].pharmacistId = {
          text: 'Pharmacist ID type must be valid object ID!',
          bn_text: 'ফার্মাসিস্ট আইডির ধরন সঠিক অবজেক্ট আইডি নয়!',
        };
      }

      if (!member.postName) {
        error[index].postName = {
          text: 'Post name must not be empty!',
          bn_text: 'কমিটির পদবী থাকতে হবে!',
        };
      } else if (typeof member.postName !== 'object') {
        error[index].postName = {
          text: 'Post name type must be object!',
          bn_text: 'পদবীর ধরন অবজেক্ট হতে হবে!',
        };
      } else if (Object.keys(member.postName).length !== 2) {
        error[index].postName = {
          text: 'Post name object must be 2 property!',
          bn_text: 'পদবীর ধরন অবজেক্টে ২ টি প্রপার্টি থাকতে হবে!',
        };
      } else {
        error[index].postName = {};
        if (typeof member.postName.name !== 'string') {
          error[index].postName.name = {
            text: 'Post name (English) must be string!',
            bn_text: 'পদবী (English) স্ট্রিং হবে!',
          };
        }
        if (typeof member.postName.bn_name !== 'string') {
          error[index].postName.bn_name = {
            text: 'Post name (বাংলা) must be string!',
            bn_text: 'পদবী (বাংলা) স্ট্রিং হবে!',
          };
        }

        Object.keys(error[index].postName).length === 0 &&
          delete error[index].postName;
      }

      if (!member.serialNumber) {
        error[index].serialNumber = {
          text: 'Empty serial!',
          bn_text: 'ক্রমিক নেই!',
        };
      } else {
        const { valid, data } = validateStringNumber(
          member.serialNumber,
          'Serial',
          'ক্রমিক'
        );
        valid
          ? (member.serialNumber = data)
          : (error[index].serialNumber = data);
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
    error.committeeId = {
      text: 'Committee ID must not be empty!',
      bn_text: 'কমিটির আইডি থাকতে হবে!',
    };
  } else if (!mongoose.isValidObjectId(committeeId)) {
    error.committeeId = {
      text: 'Committee ID type must be valid object ID!',
      bn_text: 'কমিটির আইডির ধরন সঠিক অবজেক্ট আইডি নয়!',
    };
  } else {
    newMember.committeeId = committeeId;
  }

  if (!pharmacistId) {
    error.pharmacistId = {
      text: 'Pharmacist ID must not be empty!',
      bn_text: 'ফার্মাসিস্ট আইডি থাকতে হবে!',
    };
  } else if (!mongoose.isValidObjectId(pharmacistId)) {
    error.pharmacistId = {
      text: 'Pharmacist ID type must be valid object ID!',
      bn_text: 'ফার্মাসিস্ট আইডির ধরন সঠিক অবজেক্ট আইডি নয়!',
    };
  } else {
    newMember.pharmacistId = pharmacistId;
  }

  if (!postName) {
    error.postName = {
      text: 'Post name must not be empty!',
      bn_text: 'কমিটির পদবী থাকতে হবে!',
    };
  } else if (typeof postName !== 'object') {
    error.postName = {
      text: 'Post name type must be object!',
      bn_text: 'পদবীর ধরন অবজেক্ট হতে হবে!',
    };
  } else if (Object.keys(postName).length !== 2) {
    error.postName = {
      text: 'Post name object must be 2 property!',
      bn_text: 'পদবীর ধরন অবজেক্টে ২ টি প্রপার্টি থাকতে হবে!',
    };
  } else {
    error.postName = {};
    if (typeof postName.name !== 'string') {
      error.postName.name = {
        text: 'Post name (English) must be string!',
        bn_text: 'পদবী (English) স্ট্রিং হবে!',
      };
    }
    if (typeof postName.bn_name !== 'string') {
      error.postName.bn_name = {
        text: 'Post name (বাংলা) must be string!',
        bn_text: 'পদবী (বাংলা) স্ট্রিং হবে!',
      };
    }

    Object.keys(error.postName).length === 0 && delete error.postName;

    newMember.postName = postName;
  }

  if (!serialNumber) {
    error.serialNumber = {
      text: 'Empty serial!',
      bn_text: 'ক্রমিক নেই!',
    };
  } else {
    const { valid, data } = validateStringNumber(
      serialNumber,
      'Serial',
      'ক্রমিক'
    );
    valid ? (newMember.serialNumber = data) : (error.serialNumber = data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newMember,
  };
};

const validatePatchMember = ({ pharmacistId, postName, serialNumber }) => {
  const error = {};
  const newMember = {};

  if (pharmacistId !== undefined) {
    if (!pharmacistId) {
      error.pharmacistId = {
        text: 'Pharmacist ID must not be empty!',
        bn_text: 'ফার্মাসিস্ট আইডি থাকতে হবে!',
      };
    } else if (!mongoose.isValidObjectId(pharmacistId)) {
      error.pharmacistId = {
        text: 'Pharmacist ID type must be valid object ID!',
        bn_text: 'ফার্মাসিস্ট আইডির ধরন সঠিক অবজেক্ট আইডি নয়!',
      };
    } else {
      newMember.pharmacistId = pharmacistId;
    }
  }

  if (postName !== undefined) {
    if (typeof postName !== 'object') {
      error.postName = {
        text: 'Post name type must be object!',
        bn_text: 'পদবীর ধরন অবজেক্ট হতে হবে!',
      };
    } else if (Object.keys(postName).length !== 2) {
      error.postName = {
        text: 'Post name object must be 2 property!',
        bn_text: 'পদবীর ধরন অবজেক্টে ২ টি প্রপার্টি থাকতে হবে!',
      };
    } else {
      error.postName = {};
      if (typeof postName.name !== 'string') {
        error.postName.name = {
          text: 'Post name (English) must be string!',
          bn_text: 'পদবী (English) স্ট্রিং হবে!',
        };
      }
      if (typeof postName.bn_name !== 'string') {
        error.postName.bn_name = {
          text: 'Post name (বাংলা) must be string!',
          bn_text: 'পদবী (বাংলা) স্ট্রিং হবে!',
        };
      }

      Object.keys(error.postName).length === 0 && delete error.postName;

      newMember.postName = postName;
    }
  }

  if (serialNumber !== undefined) {
    const { valid, data } = validateStringNumber(
      serialNumber,
      'Serial',
      'ক্রমিক'
    );
    valid ? (newMember.serialNumber = data) : (error.serialNumber = data);
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
    pharmacistId: member.pharmacistId._id,
    posting: getAreaInfo(member.pharmacistId, 'posting'),
    bn_posting: getBnAreaInfo(member.pharmacistId, 'posting'),
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
