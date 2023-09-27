const committeeServices = require('../services/committee');
const error = require('../utils/error');
const {
  validatePostCommittee,
  validatePatchCommittee,
} = require('../utils/committee');

const getCommittees = async (_req, res, next) => {
  try {
    const committees = await committeeServices.findCommittees();

    return res.status(200).json(committees);
  } catch (e) {
    next(e);
  }
};

const getCommitteeByPath = async (req, res, next) => {
  const path = req.params.committeePath;

  try {
    const committee = await committeeServices.findCommitteeByPath(path);

    if (!committee) {
      throw error('Committee not found!', 404);
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
      throw error('Committee not found!', 404);
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
      throw error('Committee not found!', 404);
    }

    const { valid, data } = validatePatchCommittee(req.body);

    if (!valid) {
      res.status(400).json(data);
    }

    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        committee[key] = data[key];
      });

      await committee.save();
    }

    res.status(200).json(committee);
  } catch (e) {
    next(e);
  }
};

const putCommitteeByPath = async (req, res) => {
  res.json({
    path: req.params.committeePath,
  });
};

const deleteCommitteeByPath = async (req, res, next) => {
  const path = req.params.committeePath;

  try {
    const committee = await committeeServices.findCommitteeByPath(path);

    if (!committee) {
      throw error('Committee not found!', 404);
    }

    await committeeServices.deleteCommitteeById(committee._id);
    return res.status(204).send();
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
