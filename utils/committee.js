const { validatePostMembers } = require('./member');

const validatePostCommittee = ({
  committeeTitle,
  indexNumber,
  workHasStarted,
  willExpire,
  members,
}) => {
  const error = {};
  const newCommittee = {};

  if (!committeeTitle) {
    // error.committeeTitle = 'Committee Title must not be empty!';
    error.committeeTitle = 'কমিটির শিরোনাম থাকতে হবে!';
  } else if (typeof committeeTitle !== 'string') {
    // error.committeeTitle = 'Committee Title type must be string!';
    error.committeeTitle = 'কমিটির শিরোনামের ধরন স্ট্রিং হতে হবে!';
  } else if (committeeTitle.trim().length < 5) {
    // error.committeeTitle =
    //   'Committee Title must be at least 5 characters long!';
    error.committeeTitle = 'কমিটির শিরোনাম কমপক্ষে ৫ অক্ষর দীর্ঘ হতে হবে!';
  } else {
    newCommittee.committeeTitle = committeeTitle.trim();
    newCommittee.committeePath = committeeTitle
      .trim()
      .toLowerCase()
      .replace(/ /g, '-');
  }

  if (!indexNumber) {
    newCommittee.indexNumber = '99';
  } else if (typeof indexNumber !== 'string') {
    // error.indexNumber = 'Committee Index Number type must be string!';
    error.indexNumber = 'কমিটির ইনডেক্স সংখার ধরন স্ট্রিং হতে হবে!';
  } else if (/^\d+$/.test(indexNumber.trim()) === false) {
    // error.indexNumber = 'Committee Index Number characters must be digit!';
    error.indexNumber = 'কমিটির ইনডেক্স সংখ্যা অংকের সংখ্যা হতে হবে!';
  } else {
    newCommittee.indexNumber = indexNumber.trim();
  }

  if (!workHasStarted) {
    // error.workHasStarted = 'Committee work has start must not be empty!';
    error.workHasStarted = 'কমিটির কার্যক্রম শুরুর তারিখ থাকতে হবে!';
  } else if (
    typeof workHasStarted !== 'string' ||
    workHasStarted.length !== 24
  ) {
    // error.workHasStarted = 'Committee work has started is not valid date!';
    error.workHasStarted = 'কমিটির কার্যক্রম শুরুর তারিখের ধরন সঠিক নয়!';
  } else {
    newCommittee.workHasStarted = workHasStarted;
  }

  if (!willExpire) {
    // error.willExpire = 'Committee will expire must not be empty!';
    error.willExpire = 'কমিটির মেয়াদ শেষের তারিখ থাকতে হবে!';
  } else if (typeof willExpire !== 'string' || willExpire.length !== 24) {
    // error.willExpire = 'Committee will expire is not valid date!';
    error.willExpire = 'কমিটির মেয়াদ শেষের তারিখের ধরন সঠিক নয়!';
  } else {
    newCommittee.willExpire = willExpire;
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
  indexNumber,
  workHasStarted,
  willExpire,
}) => {
  const error = {};
  const newCommittee = {};

  if (committeeTitle) {
    if (typeof committeeTitle !== 'string') {
      error.committeeTitle = 'Committee Title type must be string!';
    } else if (committeeTitle.trim().length < 5) {
      error.committeeTitle =
        'Committee Title must be at least 5 characters long!';
    } else {
      newCommittee.committeeTitle = committeeTitle.trim();
      newCommittee.committeePath = committeeTitle
        .trim()
        .toLowerCase()
        .replace(/ /g, '-');
    }
  }

  if (indexNumber) {
    if (typeof indexNumber !== 'string') {
      error.indexNumber = 'Committee Index Number type must be string!';
    } else if (/^\d+$/.test(indexNumber.trim()) === false) {
      error.indexNumber = 'Committee Index Number characters must be digit!';
    } else {
      newCommittee.indexNumber = indexNumber.trim();
    }
  }

  if (workHasStarted) {
    if (typeof workHasStarted !== 'string' || workHasStarted.length !== 24) {
      error.workHasStarted = 'Committee work has started is not valid date!';
    } else {
      newCommittee.workHasStarted = workHasStarted;
    }
  }

  if (willExpire) {
    if (typeof willExpire !== 'string' || willExpire.length !== 24) {
      error.willExpire = 'Committee will expire is not valid date!';
    } else {
      newCommittee.willExpire = willExpire;
    }
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newCommittee,
  };
};

module.exports = { validatePostCommittee, validatePatchCommittee };
