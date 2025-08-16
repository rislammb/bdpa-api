const Pharmacist = require("../models/Pharmacist");
const { jsonError } = require("../utils/error");
const { getFindOptionsFromQuery } = require("../utils/pharmacist");

const findPharmacists = async (req) => {
  const findOptions = getFindOptionsFromQuery(req.query);
  const { page = 1, page_size = 50 } = req.query;
  const skipAmount = (page - 1) * page_size;

  const pharmacists = await Pharmacist.find(findOptions)
    .sort({
      dateOfBirth: 1,
      passingYear: 1,
      name: 1,
      dateOfJoin: 1,
    })
    .skip(skipAmount)
    .limit(page_size)
    .select(
      `regNumber name bn_name memberId postingDistrict voterDistrict ${
        req.user && "dateOfBirth postingUpazila postingPlace"
      }`
    )
    .exec();

  const pharmacistsCount = await Pharmacist.countDocuments(findOptions);

  const totalPharmacistsCount = await Pharmacist.countDocuments();

  const isNext = pharmacistsCount > skipAmount + pharmacists.length;

  return {
    pharmacists,
    pharmacistsCount,
    totalPharmacistsCount,
    isNext,
  };
};

const findDetailsPharmacists = async (req) => {
  const findOptions = getFindOptionsFromQuery(req.query);
  const { page = 1, page_size = 50 } = req.query;
  const skipAmount = (page - 1) * page_size;

  const pharmacists = await Pharmacist.find(findOptions)
    .sort({
      dateOfBirth: 1,
      passingYear: 1,
      name: 1,
      dateOfJoin: 1,
    })
    .skip(skipAmount)
    .limit(page_size)
    .exec();

  const pharmacistsCount = await Pharmacist.countDocuments(findOptions);

  const totalPharmacistsCount = await Pharmacist.countDocuments();

  const isNext = pharmacistsCount > skipAmount + pharmacists.length;

  return {
    pharmacists,
    pharmacistsCount,
    totalPharmacistsCount,
    isNext,
  };
};

const findPharmacistByProperty = (key, value, select) => {
  if (key === "_id") {
    return Pharmacist.findById(value).select(select);
  } else {
    return Pharmacist.findOne({ [key]: value }).select(select);
  }
};

const createNewPharmacist = async (data) => {
  let pharmacist = await findPharmacistByProperty("regNumber", data.regNumber);

  if (pharmacist) {
    throw jsonError(
      {
        regNumber: {
          text: "Pharmacist already exists!",
          bn_text: "এই ফার্মাসিস্ট আছে!",
        },
      },
      400
    );
  }

  pharmacist = await findPharmacistByProperty("memberId", data.memberId);
  if (pharmacist) {
    throw jsonError(
      {
        memberId: {
          text: "Pharmacist already exists!",
          bn_text: "এই ফার্মাসিস্ট আছে!",
        },
      },
      400
    );
  }

  pharmacist = new Pharmacist(data);
  return pharmacist.save();
};

const updatePharmacist = async (regNumber, data) => {
  let pharmacist = await findPharmacistByProperty("regNumber", regNumber);

  if (!pharmacist) {
    throw jsonError(
      {
        text: "Pharmacist not found!",
        bn_text: "ফার্মাসিস্ট পাওয়া যায় নি!",
      },
      404
    );
  }

  return Pharmacist.findByIdAndUpdate(
    pharmacist._id,
    { ...data },
    { new: true }
  );
};

module.exports = {
  findPharmacists,
  findDetailsPharmacists,
  findPharmacistByProperty,
  createNewPharmacist,
  updatePharmacist,
};
