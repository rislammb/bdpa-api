const Pharmacist = require('../models/Pharmacist');
const error = require('../utils/error');

const findPharmacists = (select) => {
  return Pharmacist.find()
    .sort({
      dateOfBirth: 1,
      passingYear: 1,
      name: 1,
      dateOfJoin: 1,
    })
    .select(select);
};

const findPharmacistByProperty = (key, value) => {
  if (key === '_id') {
    return Pharmacist.findById(value);
  } else {
    return Pharmacist.findOne({ [key]: value });
  }
};

const createNewPharmacist = async (data) => {
  let pharmacist = data.regNumber && await findPharmacistByProperty('regNumber', data.regNumber);

  if (pharmacist) {
    throw error(
      JSON.stringify({
        regNumber: {
          text: 'Pharmacist already exists!',
          bn_text: 'এই ফার্মাসিস্ট আছে!',
        },
      }),
      400
    );
  }

  pharmacist = data.memberId && await findPharmacistByProperty('memberId', data.memberId);
  if (pharmacist) {
    throw error(
      JSON.stringify({
        memberId: {
          text: 'Pharmacist already exists!',
          bn_text: 'এই ফার্মাসিস্ট আছে!',
        },
      }),
      400
    );
  }

  pharmacist = new Pharmacist(data);
  return pharmacist.save();
};

const updatePharmacist = async (regNumber, data) => {
  let pharmacist = await findPharmacistByProperty('regNumber', regNumber);

  if (!pharmacist) {
    throw error('Pharmacist not found!', 404);
  }

  return Pharmacist.findByIdAndUpdate(
    pharmacist._id,
    { ...data },
    { new: true }
  );
};

module.exports = {
  findPharmacists,
  findPharmacistByProperty,
  createNewPharmacist,
  updatePharmacist,
};
