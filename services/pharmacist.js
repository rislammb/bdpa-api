const Pharmacist = require('../models/Pharmacist');

const findPharmacistByProperty = (key, value) => {
  if (key === '_id') {
    return Pharmacist.findById(value);
  } else {
    return Pharmacist.findOne({ [key]: value });
  }
};

module.exports = {
  findPharmacistByProperty,
};
