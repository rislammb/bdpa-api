const pharmacistService = require('../services/pharmacist');
const {
  validateRegNum,
  validatePostPharmacist,
  validateUpdatePharmacist,
} = require('../utils/pharmacist');

const getPharmacists = async (req, res, next) => {
  try {
    const pharmacists = await pharmacistService.findPharmacists(
      `regNumber name bn_name memberId postingDivision postingDistrict voterDivision voterDistrict ${
        req.user &&
        'dateOfBirth jobDepertment postingUpazila postingPlace permanentDivision permanentDistrict permanentUpazila  deputationDivision deputationDistrict deputationUpazila'
      }`
    );

    res.status(200).json(pharmacists);
  } catch (e) {
    next(e);
  }
};

const getDetailsPharmacists = async (_req, res, next) => {
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
      regNumber,
      !req.user &&
        'regNumber name bn_name email memberId jobDepertment postingDivision postingDistrict voterDivision voterDistrict'
    );

    if (!pharmacist) {
      return res.status(404).json({
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
      });
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
      id,
      !req.user &&
        'regNumber name bn_name email memberId jobDepertment postingDivision postingDistrict voterDivision voterDistrict'
    );

    if (!pharmacist) {
      return res.status(404).json({
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
      });
    }

    return res.status(200).json(pharmacist);
  } catch (e) {
    next(e);
  }
};

const postPharmacist = async (req, res, next) => {
  const { valid, data } = validatePostPharmacist(req.body);

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
    let pharmacist = await pharmacistService.findPharmacistByProperty(
      'regNumber',
      regNumber
    );
    if (!pharmacist) {
      res.status(404).json({
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
      });
    }

    const { valid, data } = validateUpdatePharmacist(req.body);

    if (!valid) {
      return res.status(400).json(data);
    }

    pharmacist = await pharmacistService.updatePharmacist(regNumber, data);

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
      res.status(404).json({
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
      });
    }

    const { valid, data } = validateUpdatePharmacist(req.body);
    if (!valid) {
      return res.status(400).json(data);
    }

    if (
      data.regNumber ||
      data.email ||
      data.mainImageUrl ||
      data.voterDivision ||
      data.voterDistrict
    ) {
      if (
        !req.user?.roles?.includes('SUPER_ADMIN') &&
        !req.user?.roles?.includes('ADMIN')
      ) {
        return res
          .status(401)
          .json({ text: 'Unauthorized!', bn_text: 'অননুমোদিত' });
      } else {
        if (Object.keys(data).length > 0) {
          Object.keys(data).forEach((key) => {
            pharmacist[key] = data[key];
          });
          await pharmacist.save();
        }

        return res.status(200).json(pharmacist);
      }
    } else {
      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach((key) => {
          pharmacist[key] = data[key];
        });
        await pharmacist.save();
      }

      return res.status(200).json(pharmacist);
    }
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
      res.status(404).json({
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
      });
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
      res.status(404).json({
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
      });
    }

    await pharmacist.remove();
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getPharmacists,
  getDetailsPharmacists,
  getPharmacistByRegistration,
  getPharmacistById,
  postPharmacist,
  putPharmacistByRegistration,
  patchPharmacistByRegistration,
  deletePharmacistByRegistration,
  deletePharmacistById,
};
