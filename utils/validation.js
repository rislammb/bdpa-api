const { enToBnNumber } = require('./number');

const validateString = (str, text, bn_text, minLength, maxLength) => {
  let err = null;

  if (typeof str !== 'string') {
    err = {
      text: `${text} type must be string!`,
      bn_text: `${bn_text} এর ধরন স্ট্রিং হবে!`,
    };
  } else if (minLength && str.trim().length < minLength) {
    err = {
      text: `${text} must at least ${minLength} characters long!`,
      bn_text: `${bn_text} কমপক্ষে ${enToBnNumber(minLength)} অক্ষর লম্বা হবে!`,
    };
  } else if (maxLength && str.trim().length >= maxLength) {
    err = {
      text: `${text} must less than ${maxLength} characters long!`,
      bn_text: `${bn_text} ${enToBnNumber(maxLength)} অক্ষরের কম হবে!`,
    };
  }

  return { valid: !err, data: err ?? str.trim() };
};

const validateStringNumber = (str, text, bn_text, length) => {
  let err = null;
  const regex = length
    ? new RegExp('^[0-9]{' + length + '}$')
    : new RegExp('^[0-9]+$');

  if (typeof str !== 'string') {
    err = {
      text: `${text} type must be string!`,
      bn_text: `${bn_text} এর ধরন স্ট্রিং হবে!`,
    };
  } else if (length && regex.test(str.trim()) === false) {
    err = {
      text: `${text} must be ${length} characters of english digit!`,
      bn_text: `${bn_text} ${enToBnNumber(length)} অক্ষরের ইংরেজি ডিজিট হবে!`,
    };
  } else if (regex.test(str.trim()) === false) {
    err = {
      text: `${text} must be english digit!`,
      bn_text: `${bn_text} ইংরেজি ডিজিট হবে!`,
    };
  }

  return {
    valid: !err,
    data: err ?? {
      name: str.trim(),
      bn_name: enToBnNumber(str.trim()),
    },
  };
};

const validateDate = (data, text, bn_text) => {
  let err = null;

  if (typeof data !== 'string' || data.length !== 24) {
    err = {
      text: `${text} is not valid date!`,
      bn_text: `${bn_text} এর ধরন সঠিক নয়!`,
    };
  }

  return { valid: !err, data: err ?? data };
};

module.exports = { validateString, validateStringNumber, validateDate };
