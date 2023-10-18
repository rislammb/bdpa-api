const fathersNameProperty = require('../constant/fathersNameProperty');
const genderProperty = require('../constant/genderProperty');
const instituteProperty = require('../constant/instituteProperty');
const mothersNameProperty = require('../constant/mothersNameProperty');
const jobDepertmentProperty = require('../constant/jobDepertmentProperty');
const { enToBnNumber } = require('./number');

const validateRegNum = (regNumber) => {
  let res = '';
  let err = {};

  if (!regNumber) {
    err.text = 'Registration number must not be empty!';
    err.bn_text = 'নিবন্ধন সংখ্যা থাকতে হবে!';
  } else if (typeof regNumber !== 'string') {
    err.text = 'Registration number type must be string';
    err.bn_text = 'নিবন্ধন সংখ্যার ধরন স্ট্রিং হবে';
  } else {
    const trimedNumber = regNumber.trim().replace(/ /g, '');

    if (/^[B-]{2}/.test(trimedNumber) === false) {
      err.text = `Registration number must start with 'B-'!`;
      err.bn_text = `নিবন্ধন সংখ্যা 'B-' দ্বারা শুরু হবে!`;
    } else if (trimedNumber.length < 6) {
      err.text =
        'Registration number must at least 6 characters long without space!';
      err.bn_text = 'নিবন্ধন সংখ্যা স্পেস বাদে কমপক্ষে ৬ অক্ষর লম্বা হবে!';
    } else {
      res = trimedNumber;
    }
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : res,
  };
};

const validateString = (str, text, bn_text, minLength) => {
  let err = null;

  if (typeof str !== 'string') {
    err = {
      text: `${text} type must be string!`,
      bn_text: `${bn_text} এর ধরন স্ট্রিং হবে!`,
    };
  } else if (minLength && str.trim().length < minLength) {
    err = {
      text: `${text} must at least ${minLength} characters long!`,
      bn_text: `${bn_text} কমপক্ষে ${enToBnNumber(minLength)} অক্ষর লম্বা হবে!`,
    };
  }

  return { valid: !err, data: err ?? str.trim() };
};

const validateStringObject = (object, text = '', bn_text = '') => {
  let err = {};
  let names = {};

  if (typeof object !== 'object') {
    err = {
      text: `${text} type must be an object!`,
      bn_text: `${bn_text} এর ধরন অবজেক্ট হবে!`,
    };
  } else {
    const mapProperty = (array) =>
      array.map((item) => {
        if (!object[item.name]) {
          names[item.name] = '';
        } else if (typeof object[item.name] !== 'string') {
          err[item.name] = {
            text: `${item.msg} type must be string!`,
            bn_text: `${item.bn_msg} এর ধরন স্ট্রিং হবে!`,
          };
        } else if (
          item.minLength &&
          object[item.name].trim().length < item.minLength
        ) {
          err[item.name] = {
            text: `${item.msg} at least ${item.minLength} characterrs long!`,
            bn_text: `${item.bn_msg} কমপক্ষে ${enToBnNumber(
              item.minLength
            )} অক্ষর লম্বা হবে!`,
          };
        } else {
          delete err[item.name];
          names[item.name] = object[item.name].trim();
        }
      });

    if (text === "Father's name") {
      if (Object.keys(object).length !== fathersNameProperty.length) {
        err = {
          text: `${text} type object must be ${fathersNameProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            fathersNameProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(fathersNameProperty);
    } else if (text === "Mothers's name") {
      if (Object.keys(object).length !== mothersNameProperty.length) {
        err = {
          text: `${text} type object must be ${mothersNameProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            mothersNameProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(mothersNameProperty);
    } else if (text === 'Institute name') {
      if (Object.keys(object).length !== instituteProperty.length) {
        err = {
          text: `${text} type object must be ${instituteProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            instituteProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(instituteProperty);
    } else if (text === 'Gender') {
      if (Object.keys(object).length !== genderProperty.length) {
        err = {
          text: `${text} type object must be ${genderProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            genderProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(genderProperty);
    } else if (text === 'Job depertment') {
      if (Object.keys(object).length !== jobDepertmentProperty.length) {
        err = {
          text: `${text} type object must be ${jobDepertmentProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            jobDepertmentProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(jobDepertmentProperty);
    }
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length < 1 ? names : err,
  };
};

const validateEmail = (email) => {
  let err = null;
  if (typeof email !== 'string') {
    err = {
      text: 'Email type must be string!',
      bn_text: 'ইমেইল এর ধরন স্ট্রিং হবে!',
    };
  } else if (
    !String(email.trim())
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    err = {
      text: 'Email is not valid!',
      bn_text: 'ইমেইল সঠিক নয়!',
    };
  }

  return { valid: !err, data: err ?? email.trim().toLowerCase() };
};

const validateStringNumber = (str, text, bn_text, length) => {
  let err = null;
  const regex = length
    ? new RegExp('^[0-9]{' + length + '}$')
    : new RegExp('^[0-9]+$');

  if (typeof str !== 'string') {
    err = {
      text: `${text} type must be string!`,
      bn_text: `${bn_text} এর ধরন স্ট্রিং হবে!`,
    };
  } else if (length && regex.test(str.trim()) === false) {
    err = {
      text: `${text} must be ${length} characters of english digit!`,
      bn_text: `${bn_text} ${enToBnNumber(length)} অক্ষরের ইংরেজি ডিজিট হবে!`,
    };
  } else if (regex.test(str.trim()) === false) {
    console.log('regex => ', regex, str.trim());
    err = {
      text: `${text} must be english digit!`,
      bn_text: `${bn_text} ইংরেজি ডিজিট হবে!`,
    };
  }

  return {
    valid: !err,
    data: err ?? {
      name: str.trim(),
      bn_name: enToBnNumber(str.trim()),
    },
  };
};

const validateDate = (data, text, bn_text) => {
  let err = null;

  if (typeof data !== 'string' || data.length !== 24) {
    err = {
      text: `${text} is not valid date!`,
      bn_text: `${bn_text} এর ধরন সঠিক নয়!`,
    };
  }

  return { valid: !err, data: err ?? data };
};

const enAreaToBnArea = {
  Posting: 'কর্মস্থল/ঠিকানা',
  Voter: 'ভোটার',
  Permanent: 'স্থায়ী',
  Deputation: 'প্রেষন/সংযুক্ত',
};

const validateDivision = (value, areaName) => {
  let res = {};
  let err = {};

  if (!value) {
    res = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof value !== 'object') {
    err.text = `${areaName} division type must be an object!`;
    err.bn_text = `${enAreaToBnArea[areaName]} বিভাগের ধরন অবজেক্ট হবে!`;
  } else if (Object.keys(value).length !== 3) {
    err.text = `${areaName} division is not valid object!`;
    err.bn_text = `${enAreaToBnArea[areaName]} বিভাগ সঠিক অবজেক্ট নয়!`;
  } else {
    res = value;
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : res,
  };
};

const validateDistrict = (value, areaName) => {
  let res = {};
  let err = {};

  if (!value) {
    res = {
      id: '',
      division_id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof value !== 'object') {
    err.text = `${areaName} district type must be an object!`;
    err.bn_text = `${enAreaToBnArea[areaName]} জেলার ধরন অবজেক্ট হবে!`;
  } else if (Object.keys(value).length !== 4) {
    err.text = `${areaName} district is not valid object!`;
    err.bn_name = `${enAreaToBnArea[areaName]} জেলা সঠিক অবজেক্ট নয়!`;
  } else {
    res = value;
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : res,
  };
};

const validateUpazila = (value, areaName) => {
  let res = {};
  let err = {};

  if (!value) {
    res = {
      id: '',
      district_id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof value !== 'object') {
    err.text = `${areaName} upazila type must be an object!`;
    err.bn_text = `${enAreaToBnArea[areaName]} উপজেলার ধরন অবজেক্ট হবে!`;
  } else if (Object.keys(value).length !== 4) {
    err.text = `${areaName} upazila is not valid object!`;
    err.bn_text = `${enAreaToBnArea[areaName]} উপজেলা সঠিক অবজেক্ট নয়!`;
  } else {
    res = value;
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : res,
  };
};

const validatePlace = (value, areaName) => {
  let res = {};
  let err = {};

  if (!value) {
    res = { name: '', bn_name: '' };
  } else if (typeof value !== 'object') {
    err.text = `${areaName} place type must be an object!`;
    err.bn_text = `${enAreaToBnArea[areaName]} স্থানের ধরন অবজেক্ট হবে!`;
  } else if (Object.keys(value).length !== 2) {
    err.text = `${areaName} place is not valid object!`;
    err.bn_name = `${enAreaToBnArea[areaName]} স্থান সঠিক অবজেক্ট নয়!`;
  } else {
    res = value;
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : res,
  };
};

const validatePostBody = ({
  regNumber,
  name,
  bn_name,
  fathersName,
  mothersName,
  email,
  mobile,
  imageUrl,
  dateOfBirth,
  gender,
  nationalId,
  institute,
  passingYear,
  memberId,
  dateOfJoin,
  jobDepertment,
  postingDivision,
  postingDistrict,
  postingUpazila,
  postingPlace,
  permanentDivision,
  permanentDistrict,
  permanentUpazila,
  permanentPlace,
  voterDivision,
  voterDistrict,
  onDeputation,
  deputationDivision,
  deputationDistrict,
  deputationUpazila,
  deputationPlace,
}) => {
  const error = {};
  const newPharmacist = {};

  const regNumRes = validateRegNum(regNumber);
  regNumRes.valid
    ? (newPharmacist.regNumber = regNumRes.data)
    : (error.regNumber = regNumRes.data);

  if (!name) {
    error.name = {
      text: 'Name (English) must not be empty!',
      bn_text: 'নাম (ইংরেজি) থাকতেই হবে!',
    };
  } else {
    const { valid, data } = validateString(
      name,
      'Name (English)',
      'নাম (ইংরেজি)',
      3
    );
    valid ? (newPharmacist.name = data) : (error.name = data);
  }

  if (!bn_name) {
    error.bn_name = {
      text: 'Name (Bengali) must not be empty!',
      bn_text: 'নাম (বাংলা) থাকতেই হবে!',
    };
  } else {
    const { valid, data } = validateString(
      bn_name,
      'Name (Bengali)',
      'নাম (বাংলা)',
      3
    );
    valid ? (newPharmacist.bn_name = data) : (error.bn_name = data);
  }

  if (!fathersName) {
    newPharmacist.fathersName = { name: '', bn_name: '' };
  } else {
    const { valid, data } = validateStringObject(
      fathersName,
      "Father's name",
      'পিতার নাম'
    );
    valid ? (newPharmacist.fathersName = data) : (error.fathersName = data);
  }

  if (!mothersName) {
    newPharmacist.mothersName = { name: '', bn_name: '' };
  } else {
    const { valid, data } = validateStringObject(
      mothersName,
      "Mothers's name",
      'মায়ের নাম'
    );
    valid ? (newPharmacist.mothersName = data) : (error.mothersName = data);
  }

  if (!email) {
    newPharmacist.email = '';
  } else {
    const { valid, data } = validateEmail(email);
    valid ? (newPharmacist.email = data) : (error.email = data);
  }

  if (!mobile) {
    newPharmacist.mobile = {
      name: '',
      bn_name: '',
    };
  } else {
    const { valid, data } = validateStringNumber(
      mobile,
      'Mobile number',
      'মোবাইল নাম্বার',
      11
    );
    valid ? (newPharmacist.mobile = data) : (error.mobile = data);
  }

  if (!imageUrl) {
    newPharmacist.imageUrl = '';
  } else {
    const { valid, data } = validateString(
      imageUrl,
      'Image URL',
      'ইমেজ ইউআরএল'
    );
    valid ? (newPharmacist.imageUrl = data) : (error.imageUrl = data);
  }

  if (!dateOfBirth) {
    newPharmacist.dateOfBirth = new Date().toISOString();
  } else {
    const { valid, data } = validateDate(
      dateOfBirth,
      'Date of birth',
      'জন্ম তারিখ'
    );
    valid ? (newPharmacist.dateOfBirth = data) : (error.dateOfBirth = data);
  }

  if (!gender) {
    newPharmacist.gender = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else {
    const { valid, data } = validateStringObject(gender, 'Gender', 'লিঙ্গ');
    valid ? (newPharmacist.gender = data) : (error.gender = data);
  }

  if (!nationalId) {
    newPharmacist.nationalId = {
      name: '',
      bn_name: '',
    };
  } else {
    const { valid, data } = validateStringNumber(
      nationalId,
      'National ID number',
      'জাতীয় পরিচয়পত্র সংখ্যা'
    );
    valid ? (newPharmacist.nationalId = data) : (error.nationalId = data);
  }

  if (!institute) {
    newPharmacist.institute = { name: '', bn_name: '' };
  } else {
    const { valid, data } = validateStringObject(
      institute,
      'Institute name',
      'ইন্সটিটিউটের নাম'
    );
    valid ? (newPharmacist.institute = data) : (error.institute = data);
  }

  if (!passingYear) {
    newPharmacist.passingYear = {
      name: '',
      bn_name: '',
    };
  } else {
    const { valid, data } = validateStringNumber(
      passingYear,
      'Passing year',
      'পাশের বছর',
      4
    );
    valid ? (newPharmacist.passingYear = data) : (error.passingYear = data);
  }

  if (!memberId) {
    newPharmacist.memberId = '';
  } else {
    const { valid, data } = validateString(
      memberId,
      'Member ID number',
      'সদস্য পরিচয়পত্র সংখ্যা'
    );
    valid ? (newPharmacist.memberId = data) : (error.memberId = data);
  }

  if (!dateOfJoin) {
    newPharmacist.dateOfJoin = null;
  } else {
    const { valid, data } = validateDate(
      dateOfJoin,
      'Date of join',
      'যোগদানের তারিখ'
    );
    valid ? (newPharmacist.dateOfJoin = data) : (error.dateOfJoin = data);
  }

  if (!jobDepertment) {
    newPharmacist.jobDepertment = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else {
    const { valid, data } = validateStringObject(
      jobDepertment,
      'Job depertment',
      'চাকুরির বিভাগ'
    );
    valid ? (newPharmacist.jobDepertment = data) : (error.jobDepertment = data);
  }

  const postingDivRes = validateDivision(postingDivision, 'Posting');
  postingDivRes.valid
    ? (newPharmacist.postingDivision = postingDivRes.data)
    : (error.postingDivision = postingDivRes.data);

  const postingDistRes = validateDistrict(postingDistrict, 'Posting');
  postingDistRes.valid
    ? (newPharmacist.postingDistrict = postingDistRes.data)
    : (error.postingDistrict = postingDistRes.data);

  const postingUpaRes = validateUpazila(postingUpazila, 'Posting');
  postingUpaRes.valid
    ? (newPharmacist.postingUpazila = postingUpaRes.data)
    : (error.postingUpazila = postingUpaRes.data);

  const postingPlaceRes = validatePlace(postingPlace, 'Posting');
  postingPlaceRes.valid
    ? (newPharmacist.postingPlace = postingPlaceRes.data)
    : (error.postingPlace = postingPlaceRes.data);

  const permanentDivRes = validateDivision(permanentDivision, 'Permanent');
  permanentDivRes.valid
    ? (newPharmacist.permanentDivision = permanentDivRes.data)
    : (error.permanentDivision = permanentDivRes.data);

  const permanentDistRes = validateDistrict(permanentDistrict, 'Permanent');
  permanentDistRes.valid
    ? (newPharmacist.permanentDistrict = permanentDistRes.data)
    : (error.permanentDistrict = permanentDistRes.data);

  const permanentUpaRes = validateUpazila(permanentUpazila, 'Permanent');
  permanentUpaRes.valid
    ? (newPharmacist.permanentUpazila = permanentUpaRes.data)
    : (error.permanentUpazila = permanentUpaRes.data);

  const permanentPlaceRes = validatePlace(permanentPlace, 'Permanent');
  permanentPlaceRes.valid
    ? (newPharmacist.permanentPlace = permanentPlaceRes.data)
    : (error.permanentPlace = permanentPlaceRes.data);

  const voterDivRes = validateDivision(voterDivision, 'Voter');
  voterDivRes.valid
    ? (newPharmacist.voterDivision = voterDivRes.data)
    : (error.voterDivision = voterDivRes.data);

  const voterDistRes = validateDistrict(voterDistrict, 'Voter');
  voterDistRes.valid
    ? (newPharmacist.voterDistrict = voterDistRes.data)
    : (error.voterDistrict = voterDistRes.data);

  if (!onDeputation) {
    newPharmacist.onDeputation = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof onDeputation !== 'object') {
    error.onDeputation = {
      text: 'On Deputation type must be an object!',
      bn_text: 'প্রেষন/সংযুক্ত কিনা এর ধরন অবজেক্ট হবে!',
    };
  } else if (Object.keys(onDeputation).length !== 3) {
    error.onDeputation = {
      text: 'On Deputation is not valid object',
      bn_text: 'প্রেষন/সংযুক্ত কিনা সঠিক অবজেক্ট নয়',
    };
  } else {
    newPharmacist.onDeputation = onDeputation;
  }

  if (newPharmacist.onDeputation.id === '2') {
    const deputationDivRes = validateDivision(deputationDivision, 'Deputation');
    deputationDivRes.valid
      ? (newPharmacist.deputationDivision = deputationDivRes.data)
      : (error.deputationDivision = deputationDivRes.data);

    const deputationDistRes = validateDistrict(
      deputationDistrict,
      'Deputation'
    );
    deputationDistRes.valid
      ? (newPharmacist.deputationDistrict = deputationDistRes.data)
      : (error.deputationDistrict = deputationDistRes.data);

    const deputationUpaRes = validateUpazila(deputationUpazila, 'Deputation');
    deputationUpaRes.valid
      ? (newPharmacist.deputationUpazila = deputationUpaRes.data)
      : (error.deputationUpazila = deputationUpaRes.data);

    const deputationPlaceRes = validatePlace(deputationPlace, 'Deputation');
    deputationPlaceRes.valid
      ? (newPharmacist.deputationPlace = deputationPlaceRes.data)
      : (error.deputationPlace = deputationPlaceRes.data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newPharmacist,
  };
};

const validatePutBody = ({
  name,
  bn_name,
  fathersName,
  mothersName,
  email,
  mobile,
  imageUrl,
  dateOfBirth,
  gender,
  nationalId,
  institute,
  passingYear,
  memberId,
  dateOfJoin,
  jobDepertment,
  postingDivision,
  postingDistrict,
  postingUpazila,
  postingPlace,
  permanentDivision,
  permanentDistrict,
  permanentUpazila,
  permanentPlace,
  voterDivision,
  voterDistrict,
  onDeputation,
  deputationDivision,
  deputationDistrict,
  deputationUpazila,
  deputationPlace,
}) => {
  const error = {};
  const newPharmacist = {};

  if (name) {
    const { valid, data } = validateString(
      name,
      'Name (English)',
      'নাম (ইংরেজি)',
      3
    );
    valid ? (newPharmacist.name = data) : (error.name = data);
  }

  if (bn_name) {
    const { valid, data } = validateString(
      bn_name,
      'Name (Bengali)',
      'নাম (বাংলা)',
      3
    );
    valid ? (newPharmacist.bn_name = data) : (error.bn_name = data);
  }

  if (fathersName) {
    const { valid, data } = validateStringObject(
      fathersName,
      "Father's name",
      'পিতার নাম'
    );
    valid ? (newPharmacist.fathersName = data) : (error.fathersName = data);
  }

  if (mothersName) {
    const { valid, data } = validateStringObject(
      mothersName,
      "Mothers's name",
      'মায়ের নাম'
    );
    valid ? (newPharmacist.mothersName = data) : (error.mothersName = data);
  }

  if (email) {
    const { valid, data } = validateEmail(email);
    valid ? (newPharmacist.email = data) : (error.email = data);
  }

  if (mobile) {
    const { valid, data } = validateStringNumber(
      mobile,
      'Mobile number',
      'মোবাইল নাম্বার',
      11
    );
    valid ? (newPharmacist.mobile = data) : (error.mobile = data);
  }

  if (imageUrl) {
    const { valid, data } = validateString(
      imageUrl,
      'Image URL',
      'ইমেজ ইউআরএল'
    );
    valid ? (newPharmacist.imageUrl = data) : (error.imageUrl = data);
  }

  if (dateOfBirth) {
    const { valid, data } = validateDate(
      dateOfBirth,
      'Date of birth',
      'জন্ম তারিখ'
    );
    valid ? (newPharmacist.dateOfBirth = data) : (error.dateOfBirth = data);
  }

  if (gender) {
    const { valid, data } = validateStringObject(gender, 'Gender', 'লিঙ্গ');
    valid ? (newPharmacist.gender = data) : (error.gender = data);
  }

  if (nationalId) {
    const { valid, data } = validateStringNumber(
      nationalId,
      'National ID number',
      'জাতীয় পরিচয়পত্র সংখ্যা'
    );
    valid ? (newPharmacist.nationalId = data) : (error.nationalId = data);
  }

  if (institute) {
    const { valid, data } = validateStringObject(
      institute,
      'Institute name',
      'ইন্সটিটিউটের নাম'
    );
    valid ? (newPharmacist.institute = data) : (error.institute = data);
  }

  if (passingYear) {
    const { valid, data } = validateStringNumber(
      passingYear,
      'Passing year',
      'পাশের বছর',
      4
    );
    valid ? (newPharmacist.passingYear = data) : (error.passingYear = data);
  }

  if (memberId) {
    const { valid, data } = validateString(
      memberId,
      'Member ID number',
      'সদস্য পরিচয়পত্র সংখ্যা'
    );
    valid ? (newPharmacist.memberId = data) : (error.memberId = data);
  }

  if (dateOfJoin) {
    const { valid, data } = validateDate(
      dateOfJoin,
      'Date of join',
      'যোগদানের তারিখ'
    );
    valid ? (newPharmacist.dateOfJoin = data) : (error.dateOfJoin = data);
  }

  if (jobDepertment) {
    const { valid, data } = validateStringObject(
      jobDepertment,
      'Job depertment',
      'চাকুরির বিভাগ'
    );
    valid ? (newPharmacist.jobDepertment = data) : (error.jobDepertment = data);
  }

  if (postingDivision) {
    const postingDivRes = validateDivision(postingDivision, 'Posting');
    postingDivRes.valid
      ? (newPharmacist.postingDivision = postingDivRes.data)
      : (error.postingDivision = postingDivRes.data);
  }
  if (postingDistrict) {
    const postingDistRes = validateDistrict(postingDistrict, 'Posting');
    postingDistRes.valid
      ? (newPharmacist.postingDistrict = postingDistRes.data)
      : (error.postingDistrict = postingDistRes.data);
  }
  if (postingUpazila) {
    const postingUpaRes = validateUpazila(postingUpazila, 'Posting');
    postingUpaRes.valid
      ? (newPharmacist.postingUpazila = postingUpaRes.data)
      : (error.postingUpazila = postingUpaRes.data);
  }
  if (postingPlace) {
    const postingPlaceRes = validatePlace(postingPlace, 'Posting');
    postingPlaceRes.valid
      ? (newPharmacist.postingPlace = postingPlaceRes.data)
      : (error.postingPlace = postingPlaceRes.data);
  }

  if (permanentDivision) {
    const permanentDivRes = validateDivision(permanentDivision, 'Permanent');
    permanentDivRes.valid
      ? (newPharmacist.permanentDivision = permanentDivRes.data)
      : (error.permanentDivision = permanentDivRes.data);
  }
  if (permanentDistrict) {
    const permanentDistRes = validateDistrict(permanentDistrict, 'Permanent');
    permanentDistRes.valid
      ? (newPharmacist.permanentDistrict = permanentDistRes.data)
      : (error.permanentDistrict = permanentDistRes.data);
  }
  if (permanentUpazila) {
    const permanentUpaRes = validateUpazila(permanentUpazila, 'Permanent');
    permanentUpaRes.valid
      ? (newPharmacist.permanentUpazila = permanentUpaRes.data)
      : (error.permanentUpazila = permanentUpaRes.data);
  }
  if (permanentPlace) {
    const permanentPlaceRes = validatePlace(permanentPlace, 'Permanent');
    permanentPlaceRes.valid
      ? (newPharmacist.permanentPlace = permanentPlaceRes.data)
      : (error.permanentPlace = permanentPlaceRes.data);
  }

  if (voterDivision) {
    const voterDivRes = validateDivision(voterDivision, 'Voter');
    voterDivRes.valid
      ? (newPharmacist.voterDivision = voterDivRes.data)
      : (error.voterDivision = voterDivRes.data);
  }
  if (voterDistrict) {
    const voterDistRes = validateDistrict(voterDistrict, 'Voter');
    voterDistRes.valid
      ? (newPharmacist.voterDistrict = voterDistRes.data)
      : (error.voterDistrict = voterDistRes.data);
  }

  if (onDeputation) {
    if (typeof onDeputation !== 'string') {
      error.onDeputation = 'onDeputation type must be string!';
    } else {
      newPharmacist.onDeputation = onDeputation.trim();
    }

    if (onDeputation.id === '1') {
      newPharmacist['deputationDivision'] = {
        id: '',
        name: '',
        bn_name: '',
      };
      newPharmacist['deputationDistrict'] = {
        id: '',
        division_id: '',
        name: '',
        bn_name: '',
      };
      newPharmacist['deputationUpazila'] = {
        id: '',
        district_id: '',
        name: '',
        bn_name: '',
      };
      newPharmacist['deputationPlace'] = '';
    }
  }

  if (deputationDivision) {
    const deputationDivRes = validateDivision(deputationDivision, 'Deputation');
    deputationDivRes.valid
      ? (newPharmacist.deputationDivision = deputationDivRes.data)
      : (error.deputationDivision = deputationDivRes.data);
  }

  if (deputationDistrict) {
    const deputationDistRes = validateDistrict(
      deputationDistrict,
      'Deputation'
    );
    deputationDistRes.valid
      ? (newPharmacist.deputationDistrict = deputationDistRes.data)
      : (error.deputationDistrict = deputationDistRes.data);
  }

  if (deputationUpazila) {
    const deputationUpaRes = validateUpazila(deputationUpazila, 'Deputation');
    deputationUpaRes.valid
      ? (newPharmacist.deputationUpazila = deputationUpaRes.data)
      : (error.deputationUpazila = deputationUpaRes.data);
  }

  if (deputationPlace) {
    const deputationPlaceRes = validatePlace(deputationPlace, 'Deputation');
    deputationPlaceRes.valid
      ? (newPharmacist.deputationPlace = deputationPlaceRes.data)
      : (error.deputationPlace = deputationPlaceRes.data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newPharmacist,
  };
};

module.exports = {
  validateRegNum,
  validatePostBody,
  validatePutBody,
};
