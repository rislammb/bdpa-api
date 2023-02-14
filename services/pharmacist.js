const Pharmacist = require('../models/Pharmacist');

const findPharmacists = () => {
  return Pharmacist.find().sort({ dateOfJoin: 1, dateOfBirth: 1, name: 1 });
};

const findPharmacistByProperty = (key, value) => {
  if (key === '_id') {
    return Pharmacist.findById(value);
  } else {
    return Pharmacist.findOne({ [key]: value });
  }
};

module.exports = { findPharmacists, findPharmacistByProperty };
