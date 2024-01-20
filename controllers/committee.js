const committeeServices = require('../services/committee');
const {
  validatePostCommittee,
  validatePatchCommittee,
} = require('../utils/committee');

const getCommittees = async (req, res, next) => {
  try {
    const response = await committeeServices.findCommittees(req);

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getCommitteeByPath = async (req, res, next) => {
  const path = req.params.committeePath;

  try {
    const committee = await committeeServices.findCommitteeByPath(path);

    if (!committee) {
      return res.status(404).json({
        text: 'Committee not found!',
        bn_text: 'কমিটি খুঁজে পাওয়া যায় নি!',
      });
    }

    return res.status(200).json(committee);
  } catch (e) {
    next(e);
  }
};

const getCommitteeById = async (req, res, next) => {
  const { committeeId } = req.params;

  try {
    const committee = await committeeServices.findCommitteeById(committeeId);

    if (!committee) {
      return res.status(404).json({
        text: 'Committee not found!',
        bn_text: 'কমিটি খুঁজে পাওয়া যায় নি!',
      });
    }

    return res.status(200).json(committee);
  } catch (e) {
    next(e);
  }
};

const postCommittee = async (req, res, next) => {
  const { valid, data } = validatePostCommittee(req.body);

  if (!valid) {
    return res.status(400).json(data);
  }

  try {
    const committee = await committeeServices.createNewCommittee(data);

    return res.status(201).json(committee);
  } catch (e) {
    next(e);
  }
};

const patchCommitteeByPath = async (req, res, next) => {
  const path = req.params.committeePath;

  try {
    const committee = await committeeServices.findCommitteeOnlyByPath(path);

    if (!committee) {
      return res.status(404).json({
        text: 'Committee not found!',
        bn_text: 'কমিটি খুঁজে পাওয়া যায় নি!',
      });
    }

    const { valid, data } = validatePatchCommittee(req.body);

    if (!valid) {
      return res.status(400).json(data);
    }

    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        committee[key] = data[key];
      });

      await committee.save();
    }

    return res.status(200).json(committee);
  } catch (e) {
    next(e);
  }
};

const putCommitteeByPath = async (req, res) => {
  return res.json({
    path: req.params.committeePath,
  });
};

const deleteCommitteeByPath = async (req, res, next) => {
  const path = req.params.committeePath;

  try {
    const committee = await committeeServices.findCommitteeByPath(path);

    if (committee) {
      await committeeServices.deleteCommitteeById(committee._id);
      return res.status(204).send();
    } else {
      return res.status(404).json({
        text: 'Committee not found!',
        bn_text: 'কমিটি খুঁজে পাওয়া যায় নি!',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCommittees,
  getCommitteeByPath,
  getCommitteeById,
  postCommittee,
  patchCommitteeByPath,
  putCommitteeByPath,
  deleteCommitteeByPath,
};
