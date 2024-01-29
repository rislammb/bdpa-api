const Pharmacist = require('../models/Pharmacist');
const { jsonError } = require('../utils/error');

const findPharmacists = async (req) => {
  const {
    page = 1,
    page_size = 50,
    query = '',
    location_type = 'all',
    division = 'all',
    district = 'all',
    upazila = 'all',
    job_depertment_id = 'all',
  } = req.query;

  const skipAmount = (page - 1) * page_size;

  const divisionOptions =
    location_type === 'currentAddress'
      ? division === 'all'
        ? [{}]
        : [{ 'postingDivision.id': division }]
      : location_type === 'voterArea'
      ? division === 'all'
        ? [{}]
        : [{ 'voterDivision.id': division }]
      : location_type === 'permanentAddress'
      ? division === 'all'
        ? [{}]
        : [{ 'permanentDivision.id': division }]
      : location_type === 'deputationPosting'
      ? division === 'all'
        ? [{}]
        : [{ 'deputationDivision.id': division }]
      : division === 'all'
      ? [{}]
      : [
          { 'postingDivision.id': division },
          { 'voterDivision.id': division },
          { 'permanentDivision.id': division },
          { 'deputationDivision.id': division },
        ];

  const districtOptions =
    location_type === 'currentAddress'
      ? district === 'all'
        ? [{}]
        : [{ 'postingDistrict.id': district }]
      : location_type === 'voterArea'
      ? district === 'all'
        ? [{}]
        : [{ 'voterDistrict.id': district }]
      : location_type === 'permanentAddress'
      ? district === 'all'
        ? [{}]
        : [{ 'permanentDistrict.id': district }]
      : location_type === 'deputationPosting'
      ? district === 'all'
        ? [{}]
        : [{ 'deputationDistrict.id': district }]
      : district === 'all'
      ? [{}]
      : [
          { 'postingDistrict.id': district },
          { 'voterDistrict.id': district },
          { 'permanentDistrict.id': district },
          { 'deputationDistrict.id': district },
        ];

  const upazilaOptions =
    location_type === 'currentAddress'
      ? upazila === 'all'
        ? [{}]
        : [{ 'postingUpazila.id': upazila }]
      : location_type === 'permanentAddress'
      ? upazila === 'all'
        ? [{}]
        : [{ 'permanentUpazila.id': upazila }]
      : location_type === 'deputationPosting'
      ? upazila === 'all'
        ? [{}]
        : [{ 'deputationUpazila.id': upazila }]
      : upazila === 'all'
      ? [{}]
      : [
          { 'postingUpazila.id': upazila },
          { 'permanentUpazila.id': upazila },
          { 'deputationUpazila.id': upazila },
        ];

  const searchOptions = {
    $or: [
      { regNumber: { $regex: query, $options: 'i' } },
      { name: { $regex: query, $options: 'i' } },
      { bn_name: { $regex: query, $options: 'i' } },
      { memberId: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ],
  };

  const findOptions = {
    $or: divisionOptions,
    $and: [
      {
        $or: districtOptions,
        $and: [
          {
            $or: upazilaOptions,
            $and: [
              job_depertment_id === 'all'
                ? {
                    $and: [searchOptions],
                  }
                : {
                    'jobDepertment.id': job_depertment_id,
                    $and: [searchOptions],
                  },
            ],
          },
        ],
      },
    ],
  };

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
      `regNumber name bn_name email memberId postingDivision postingDistrict voterDivision voterDistrict jobDepertment ${
        req.user &&
        'dateOfBirth postingUpazila postingPlace permanentDivision permanentDistrict permanentUpazila  deputationDivision deputationDistrict deputationUpazila'
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

const findPharmacistByProperty = (key, value, select) => {
  if (key === '_id') {
    return Pharmacist.findById(value).select(select);
  } else {
    return Pharmacist.findOne({ [key]: value }).select(select);
  }
};

const createNewPharmacist = async (data) => {
  let pharmacist = await findPharmacistByProperty('regNumber', data.regNumber);

  if (pharmacist) {
    throw jsonError(
      {
        regNumber: {
          text: 'Pharmacist already exists!',
          bn_text: 'এই ফার্মাসিস্ট আছে!',
        },
      },
      400
    );
  }

  pharmacist = await findPharmacistByProperty('memberId', data.memberId);
  if (pharmacist) {
    throw jsonError(
      {
        memberId: {
          text: 'Pharmacist already exists!',
          bn_text: 'এই ফার্মাসিস্ট আছে!',
        },
      },
      400
    );
  }

  pharmacist = new Pharmacist(data);
  return pharmacist.save();
};

const updatePharmacist = async (regNumber, data) => {
  let pharmacist = await findPharmacistByProperty('regNumber', regNumber);

  if (!pharmacist) {
    throw jsonError(
      {
        text: 'Pharmacist not found!',
        bn_text: 'ফার্মাসিস্ট পাওয়া যায় নি!',
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
  findPharmacistByProperty,
  createNewPharmacist,
  updatePharmacist,
};
