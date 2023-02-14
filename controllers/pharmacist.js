const error = require('../utils/error');
const pharmacistService = require('../services/pharmacist');
const { validateRegNum } = require('../utils/pharmacist');

const getPharmacists = async (_req, res, next) => {
  try {
    const pharmacists = await pharmacistService.findPharmacists();

    res.status(200).json(pharmacists);
  } catch (e) {
    next(e);
  }
};

const getPharmacistByRegistration = async (req, res, next) => {
  const { regNumber } = req.params;
  console.log(regNumber);

  try {
    const pharmacist = await pharmacistService.findPharmacistByProperty(
      'regNumber',
      regNumber
    );

    if (!pharmacist) {
      throw error('Pharmacist not found!', 404);
    }

    return res.status(200).json(pharmacist);
  } catch (e) {
    next(e);
  }
};

const postPharmacist = async (req, res, next) => {
  const { regNumber } = req.body;
  const regNumberRes = validateRegNum(regNumber);

  if (!regNumberRes.valid) {
    return res.status(400).json(regNumberRes.data);
  }

  try {
    const pharmacist = await pharmacistService.findPharmacistByProperty(
      'regNumber',
      regNumber
    );

    if (pharmacist) {
      return res.status(400).json({ message: 'Pharmacist already exists!' });
    }

    return res.status(201).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getPharmacists,
  getPharmacistByRegistration,
  postPharmacist,
};
