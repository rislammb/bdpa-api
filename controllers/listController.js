const {
  validateRegNum,
  validatePostBody,
  validatePutBody,
} = require('../helpers/utilities');
const Pharmacist = require('../models/Pharmacist');

const getAllPharmacists = async (_req, res) => {
  const prarmacists = await Pharmacist.find();
  res.json(prarmacists);
};

const getSinglePharmacist = async (req, res) => {
  const { regNumber } = req.params;
  const pharmacist = await Pharmacist.findOne({ regNumber });
  if (pharmacist) {
    res.status(200).json(pharmacist);
  } else {
    res.status(404).json({
      message: 'Requested Pharmacist wan not found!',
    });
  }
};

const postPharmacist = async (req, res) => {
  const regNumRes = validateRegNum(req.body.regNumber);

  if (!regNumRes.valid) {
    return res.status(400).json(regNumRes.data);
  } else {
    const dbPharmacist = await Pharmacist.findOne({
      regNumber: regNumRes.data,
    });

    if (dbPharmacist) {
      return res.status(400).json({
        regNumber: 'Pharmacist already exists!',
      });
    } else {
      const { valid, data } = validatePostBody(req.body);
      if (valid) {
        const pharmacist = new Pharmacist(data);
        await pharmacist.save();

        return res.status(200).json({ pharmacist });
      } else {
        return res.status(400).json(data);
      }
    }
  }
};

const putPharmacist = async (req, res) => {
  const regNumRes = validateRegNum(req.params.regNumber);

  if (!regNumRes.valid) {
    return res.status(400).json(regNumRes.data);
  } else {
    const dbPharmacist = await Pharmacist.findOne({
      regNumber: regNumRes.data,
    });

    if (!dbPharmacist) {
      return res.status(400).json({
        regNumber: 'Pharmacist not found!',
      });
    } else {
      if (Object.keys(req.body).length > 0) {
        const { valid, data } = validatePutBody(req.body);
        if (valid) {
          const pharmacist = await Pharmacist.findByIdAndUpdate(
            dbPharmacist._id,
            data
          );
          return res.status(201).json({ pharmacist });
        } else {
          return res.status(400).json(data);
        }
      } else {
        return res.status(400).json({
          mesage: 'Updated data was not found!',
        });
      }
    }
  }
};

const deletePharmacist = async (req, res) => {
  const { regNumber } = req.params;
  const deleteRes = await Pharmacist.deleteOne({ regNumber });
  if (deleteRes.deletedCount) {
    res.status(200).json({
      mesage: 'Pharmacist deleted successfully',
    });
  } else {
    res.status(404).json({
      message: 'Something went worng!',
    });
  }
};

const getDivisionPharmacist = async (req, res) => {
  const { divisionId } = req.params;

  if (divisionId) {
    res.status(200).json({ divisionId });
  } else {
    res.status(404).json({
      message: 'Requested Pharmacist wan not found!',
    });
  }
};

const getDistrictPharmacist = async (req, res) => {
  const { distName } = req.params;
  // const pharmacist = await Pharmacist.findOne({ regNumber });
  if (distName) {
    res.status(200).json({ distName });
  } else {
    res.status(404).json({
      message: 'Requested Pharmacist wan not found!',
    });
  }
};

module.exports = {
  getAllPharmacists,
  getSinglePharmacist,
  postPharmacist,
  putPharmacist,
  deletePharmacist,
  getDivisionPharmacist,
  getDistrictPharmacist,
};
