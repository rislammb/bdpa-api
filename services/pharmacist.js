const Pharmacist = require('../models/Pharmacist');
const { jsonError } = require('../utils/error');

const findPharmacists = async (req) => {
  const {
    pageNumber = 1,
    pageSize = 50,
    locationFilter = {
      locationType: 'all',
      division: 'all',
      district: 'all',
      upazila: 'all',
    },
    depertmentFilter = 'all',
    searchTerm = '',
  } = req.query;

  const { locationType, division, district, upazila } = locationFilter;

  const skipAmount = (pageNumber - 1) * pageSize;

  const divisionOptions =
    locationType === 'currentAddress'
      ? division === 'all'
        ? [{}]
        : [{ 'postingDivision.id': division }]
      : locationType === 'voterArea'
      ? division === 'all'
        ? [{}]
        : [{ 'voterDivision.id': division }]
      : locationType === 'permanentAddress'
      ? division === 'all'
        ? [{}]
        : [{ 'permanentDivision.id': division }]
      : locationType === 'deputationPosting'
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
    locationType === 'currentAddress'
      ? district === 'all'
        ? [{}]
        : [{ 'postingDistrict.id': district }]
      : locationType === 'voterArea'
      ? district === 'all'
        ? [{}]
        : [{ 'voterDistrict.id': district }]
      : locationType === 'permanentAddress'
      ? district === 'all'
        ? [{}]
        : [{ 'permanentDistrict.id': district }]
      : locationType === 'deputationPosting'
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
    locationType === 'currentAddress'
      ? upazila === 'all'
        ? [{}]
        : [{ 'postingUpazila.id': upazila }]
      : locationType === 'permanentAddress'
      ? upazila === 'all'
        ? [{}]
        : [{ 'permanentUpazila.id': upazila }]
      : locationType === 'deputationPosting'
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
      { regNumber: { $regex: searchTerm, $options: 'i' } },
      { name: { $regex: searchTerm, $options: 'i' } },
      { bn_name: { $regex: searchTerm, $options: 'i' } },
      { memberId: { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } },
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
              depertmentFilter === 'all'
                ? {
                    $and: [searchOptions],
                  }
                : {
                    'jobDepertment.id': depertmentFilter,
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
    .limit(pageSize)
    .select(
      `regNumber name bn_name email memberId postingDivision postingDistrict voterDivision voterDistrict jobDepertment ${
        req.user &&
        'dateOfBirth postingUpazila postingPlace permanentDivision permanentDistrict permanentUpazila  deputationDivision deputationDistrict deputationUpazila'
      }`
    )
    .exec();

  const pharmacistsCount = await Pharmacist.countDocuments(findOptions);

  const totalPharmacistsCount = await Pharmacist.countDocuments();

  const isNext = totalPharmacistsCount > skipAmount + pharmacists.length;

  return {
    pharmacists,
    pharmacistsCount,
    totalPharmacistsCount,
    isNext,
  };
};

// const findPharmacists = (select) => {
//   return Pharmacist.find()
//     .sort({
//       dateOfBirth: 1,
//       passingYear: 1,
//       name: 1,
//       dateOfJoin: 1,
//     })
//     .select(select);
// };

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
