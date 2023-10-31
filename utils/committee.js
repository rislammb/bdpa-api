const { validatePostMembers } = require('./member');
const {
  validateString,
  validateStringNumber,
  validateDate,
} = require('./validation');

const validatePostCommittee = ({
  committeeTitle,
  bn_committeeTitle,
  indexNumber,
  workHasStarted,
  willExpire,
  members,
}) => {
  const error = {};
  const newCommittee = {};

  if (!committeeTitle) {
    error.committeeTitle = {
      text: 'Committee Title (English) must not be empty!',
      bn_text: 'কমিটির শিরোনাম (English) থাকতে হবে!',
    };
  } else {
    const { valid, data } = validateString(
      committeeTitle,
      'Committee Title (English)',
      'কমিটির শিরোনাম (English)',
      7
    );

    if (valid) {
      newCommittee.committeeTitle = data.trim();
      newCommittee.committeePath = data.trim().toLowerCase().replace(/ /g, '-');
    } else {
      error.committeeTitle = data;
    }
  }

  if (!bn_committeeTitle) {
    error.bn_committeeTitle = {
      text: 'Committee Title (বাংলা) must not be empty!',
      bn_text: 'কমিটির শিরোনাম (বাংলা) থাকতে হবে!',
    };
  } else {
    const { valid, data } = validateString(
      bn_committeeTitle,
      'Committee Title (বাংলা)',
      'কমিটির শিরোনাম (বাংলা)',
      7
    );
    valid
      ? (newCommittee.bn_committeeTitle = data.trim())
      : (error.bn_committeeTitle = data);
  }

  if (!indexNumber) {
    newCommittee.indexNumber = {
      name: '99',
      bn_name: '৯৯',
    };
  } else {
    const { valid, data } = validateStringNumber(
      indexNumber,
      'Index number',
      'ইনডেক্স নাম্বার'
    );
    valid ? (newCommittee.indexNumber = data) : (error.indexNumber = data);
  }

  if (!workHasStarted) {
    newCommittee.workHasStarted = null;
  } else {
    const { valid, data } = validateDate(
      workHasStarted,
      'Committee work has started',
      'কমিটির কার্যক্রম শুরুর তারিখ'
    );
    valid
      ? (newCommittee.workHasStarted = data)
      : (error.workHasStarted = data);
  }

  if (!willExpire) {
    newCommittee.willExpire = null;
  } else {
    const { valid, data } = validateDate(
      willExpire,
      'Committee will expire',
      'কমিটির মেয়াদ শেষের তারিখ'
    );
    valid ? (newCommittee.willExpire = data) : (error.willExpire = data);
  }

  const memberRes = validatePostMembers(members);
  if (!memberRes.valid) {
    error.members = memberRes.data;
  } else {
    newCommittee.members = memberRes.data;
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newCommittee,
  };
};

const validatePatchCommittee = ({
  committeeTitle,
  bn_committeeTitle,
  indexNumber,
  workHasStarted,
  willExpire,
}) => {
  const error = {};
  const newCommittee = {};

  if (committeeTitle !== undefined) {
    const { valid, data } = validateString(
      committeeTitle,
      'Committee Title (English)',
      'কমিটির শিরোনাম (English)',
      7
    );

    if (valid) {
      newCommittee.committeeTitle = data.trim();
      newCommittee.committeePath = data.trim().toLowerCase().replace(/ /g, '-');
    } else {
      error.committeeTitle = data;
    }
  }

  if (bn_committeeTitle !== undefined) {
    const { valid, data } = validateString(
      bn_committeeTitle,
      'Committee Title (বাংলা)',
      'কমিটির শিরোনাম (বাংলা)',
      7
    );
    valid
      ? (newCommittee.bn_committeeTitle = data.trim())
      : (error.bn_committeeTitle = data);
  }

  if (indexNumber !== undefined) {
    const { valid, data } = validateStringNumber(
      indexNumber,
      'Index number',
      'ইনডেক্স নাম্বার'
    );
    valid ? (newCommittee.indexNumber = data) : (error.indexNumber = data);
  }

  if (workHasStarted !== undefined) {
    const { valid, data } = validateDate(
      workHasStarted,
      'Committee work has started',
      'কমিটির কার্যক্রম শুরুর তারিখ'
    );
    valid
      ? (newCommittee.workHasStarted = data)
      : (error.workHasStarted = data);
  }

  if (willExpire !== undefined) {
    const { valid, data } = validateDate(
      willExpire,
      'Committee will expire',
      'কমিটির মেয়াদ শেষের তারিখ'
    );
    valid ? (newCommittee.willExpire = data) : (error.willExpire = data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newCommittee,
  };
};

module.exports = { validatePostCommittee, validatePatchCommittee };
