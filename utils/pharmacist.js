const validateRegNum = (regNumber) => {
  let reg = '';
  let err = {};

  if (!regNumber) {
    err.regNumber = 'Registration number must not be empty!';
  } else if (typeof regNumber !== 'string') {
    err.regNumber = 'Registration number type must be string';
  } else if (/^[B-]{2}/.test(regNumber.trim()) === false) {
    err.regNumber = `Registration number must start with 'B-'!`;
  } else if (regNumber.trim().length < 6) {
    err.regNumber = 'Registration number must at least 6 characters long!';
  } else {
    reg = regNumber.trim();
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : reg,
  };
};

module.exports = {
  validateRegNum,
};
