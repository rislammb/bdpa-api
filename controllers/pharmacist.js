const error = require('../utils/error');
const pharmacistService = require('../services/pharmacist');
const {
  validateRegNum,
  validatePostBody,
  validatePutBody,
} = require('../utils/pharmacist');

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

const getPharmacistById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pharmacist = await pharmacistService.findPharmacistByProperty(
      '_id',
      id
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

  const { valid, data } = validatePostBody(req.body);

  if (!valid) {
    return res.status(400).json(data);
  }

  try {
    const pharmacist = await pharmacistService.createNewPharmacist(data);

    return res.status(201).json(pharmacist);
  } catch (e) {
    next(e);
  }
};

const putPharmacistByRegistration = async (req, res, next) => {
  const { regNumber } = req.params;

  const regNumRes = validateRegNum(regNumber);
  if (!regNumRes.valid) {
    return res.status(400).json(regNumRes.data);
  }

  try {
    const { valid, data } = validatePutBody(req.body);

    if (!valid) {
      return res.status(400).json(data);
    }

    const pharmacist = await pharmacistService.updatePharmacist(
      regNumber,
      data
    );

    return res.status(200).json(pharmacist);
  } catch (e) {
    next(e);
  }
};

const patchPharmacistByRegistration = async (req, res, next) => {
  const { regNumber } = req.params;

  const regNumRes = validateRegNum(regNumber);
  if (!regNumRes.valid) {
    return res.status(400).json(regNumRes.data);
  }

  try {
    const pharmacist = await pharmacistService.findPharmacistByProperty(
      'regNumber',
      regNumber
    );

    if (!pharmacist) {
      throw error('Pharmacist not found!', 404);
    }

    const { valid, data } = validatePutBody(req.body);
    if (!valid) {
      return res.status(400).json(data);
    }

    pharmacist.name = data.name ?? pharmacist.name;
    pharmacist.bn_name = data.bn_name ?? pharmacist.bn_name;
    pharmacist.fathersName = data.fathersName ?? pharmacist.fathersName;
    pharmacist.mothersName = data.mothersName ?? pharmacist.mothersName;
    pharmacist.email = data.email ?? pharmacist.email;
    pharmacist.mobile = data.mobile ?? pharmacist.mobile;
    pharmacist.dateOfBirth = data.dateOfBirth ?? pharmacist.dateOfBirth;
    pharmacist.gender = data.gender ?? pharmacist.gender;
    pharmacist.nationalId = data.nationalId ?? pharmacist.nationalId;
    pharmacist.passingYear = data.passingYear ?? pharmacist.passingYear;
    pharmacist.memberId = data.memberId ?? pharmacist.memberId;
    pharmacist.dateOfJoin = data.dateOfJoin ?? pharmacist.dateOfJoin;
    pharmacist.jobDepertment = data.jobDepertment ?? pharmacist.jobDepertment;
    pharmacist.postingDivision =
      data.postingDivision ?? pharmacist.postingDivision;
    pharmacist.postingDistrict =
      data.postingDistrict ?? pharmacist.postingDistrict;
    pharmacist.postingUpazila =
      data.postingUpazila ?? pharmacist.postingUpazila;
    pharmacist.postingPlace = data.postingPlace ?? pharmacist.postingPlace;
    pharmacist.permanentDivision =
      data.permanentDivision ?? pharmacist.permanentDivision;
    pharmacist.permanentDistrict =
      data.permanentDistrict ?? pharmacist.permanentDistrict;
    pharmacist.permanentUpazila =
      data.permanentUpazila ?? pharmacist.permanentUpazila;
    pharmacist.permanentPlace =
      data.permanentPlace ?? pharmacist.permanentPlace;
    pharmacist.voterDivision = data.voterDivision ?? pharmacist.voterDivision;
    pharmacist.voterDistrict = data.voterDistrict ?? pharmacist.voterDistrict;
    pharmacist.onDeputation = data.onDeputation ?? pharmacist.onDeputation;
    pharmacist.deputationDivision =
      data.deputationDivision ?? pharmacist.deputationDivision;
    pharmacist.deputationDistrict =
      data.deputationDistrict ?? pharmacist.deputationDistrict;
    pharmacist.deputationUpazila =
      data.deputationUpazila ?? pharmacist.deputationUpazila;
    pharmacist.deputationPlace =
      data.deputationPlace ?? pharmacist.deputationPlace;

    await pharmacist.save();

    return res.status(200).json(pharmacist);
  } catch (e) {
    next(e);
  }
};

const deletePharmacistByRegistration = async (req, res, next) => {
  const { regNumber } = req.params;

  const regNumRes = validateRegNum(regNumber);
  if (!regNumRes.valid) {
    return res.status(400).json(regNumRes.data);
  }

  try {
    const pharmacist = await pharmacistService.findPharmacistByProperty(
      'regNumber',
      regNumber
    );

    if (!pharmacist) {
      throw error('Pharmacist not found!', 404);
    }

    await pharmacist.remove();
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const deletePharmacistById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pharmacist = await pharmacistService.findPharmacistByProperty(
      '_id',
      id
    );

    if (!pharmacist) {
      throw error('Pharmacist not found!', 404);
    }

    await pharmacist.remove();
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getPharmacists,
  getPharmacistByRegistration,
  getPharmacistById,
  postPharmacist,
  putPharmacistByRegistration,
  patchPharmacistByRegistration,
  deletePharmacistByRegistration,
  deletePharmacistById,
};
