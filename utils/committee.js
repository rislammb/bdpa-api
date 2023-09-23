const validatePostBody = ({
  committeeTitle,
  indexNumber,
  workHasStarted,
  willExpire,
  members,
}) => {
  const error = {};
  const newCommittee = {};

  if (!committeeTitle) {
    error.committeeTitle = 'Committee Title must not be empty!';
  } else if (typeof committeeTitle !== 'string') {
    error.committeeTitle = 'Committee Title type must be string!';
  } else if (committeeTitle.trim().length < 5) {
    error.committeeTitle =
      'Committee Title must be at least 5 characters long!';
  } else {
    newCommittee.committeeTitle = committeeTitle;
    newCommittee.committeePath = committeeTitle
      .trim()
      .toLowerCase()
      .replace(/ /g, '-');
  }

  if (!indexNumber) {
    newCommittee.indexNumber = '';
  } else {
    newCommittee.indexNumber = indexNumber;
  }
  // if (!indexNumber) {
  //   newCommittee.indexNumber = '';
  // } else if (
  //   typeof indexNumber != 'string' ||
  //   typeof indexNumber != 'number'
  // ) {
  //   error.indexNumber = 'Committee index number type must be string or number!';
  // } else {
  //   newCommittee.indexNumber = indexNumber;
  // }

  if (!workHasStarted) {
    newCommittee.workHasStarted = new Date().toISOString();
  } else if (
    typeof workHasStarted !== 'string' ||
    workHasStarted.length !== 24
  ) {
    error.workHasStarted = 'Work has started is not valid date!';
  } else {
    newCommittee.workHasStarted = workHasStarted;
  }

  if (!willExpire) {
    newCommittee.willExpire = new Date().toISOString();
  } else if (typeof willExpire !== 'string' || willExpire.length !== 24) {
    error.willExpire = 'Will expire is not valid date!';
  } else {
    newCommittee.willExpire = willExpire;
  }

  if (!members) {
    error.members = 'Committee members list must not be empty!';
  } else if (!Array.isArray(members)) {
    error.members = 'Committee member list must be an array!';
  } else if (members.length < 1) {
    error.members = 'Committee member list must not be empty!';
  } else {
    error.members = {};
    newCommittee.members = [];
    members.forEach((member) => {
      if (typeof member !== 'object') {
        error.members.list = 'Committee member must be an object!';
      }
      if (!member.pharmacistId) {
        error.members.pharmacistId = 'Pharmacist ID must not be empty!';
      }
      if (!member.postName) {
        error.members.postName = 'Committee post name must not be empty!';
      }
      delete error.members;
      newCommittee.members.push(member);
    });
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newCommittee,
  };
};

module.exports = { validatePostBody };
