const { convertEnToBn } = require('./number');

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

const validateName = (name) => {
  let err = null;
  if (typeof name !== 'string') {
    err = {
      text: 'Name (English) type must be string!',
      bn_text: 'নাম (ইংরেজি) এর ধরন স্ট্রিং হবে!',
    };
  } else if (name.trim().length < 3) {
    err = {
      text: 'Name (English) must at least 3 characters long!',
      bn_text: 'নাম (ইংরেজি) কমপক্ষে ৩ অক্ষর লম্বা হবে!',
    };
  }

  return { valid: !err, data: err ?? name.trim() };
};

const validateBnName = (bn_name) => {
  let err = null;
  if (typeof bn_name !== 'string') {
    err = {
      text: 'Name (Bengali) type must be string!',
      bn_text: 'নাম (বাংলা) এর ধরন স্ট্রিং হবে!',
    };
  } else if (bn_name.trim().length < 3) {
    err = {
      text: 'Name (Bengali) must at least 3 characters long!',
      bn_text: 'নাম (বাংলা) কমপক্ষে ৩ অক্ষর লম্বা হবে!',
    };
  }

  return { valid: !err, data: err ?? bn_name.trim() };
};

const validateFathersName = (fathersName) => {
  let err = {};
  let names = {};
  if (typeof fathersName !== 'object') {
    err = {
      text: "Father's Name type must be an object!",
      bn_text: 'পিতার নামের ধরন অবজেক্ট হবে!',
    };
  } else {
    if (!fathersName.name) {
      names.name = '';
    } else if (typeof fathersName.name !== 'string') {
      err.name = {
        text: "Father's Name (English) type must be string!",
        bn_text: 'পিতার নাম (ইংরেজি) এর ধরন স্ট্রিং হবে!',
      };
    } else if (fathersName.name.trim().length < 3) {
      err.name = {
        text: "Father's Name (English) at least 3 characterrs long!",
        bn_text: 'পিতার নাম (ইংরেজি) কমপক্ষে ৩ অক্ষর লম্বা হবে!',
      };
    } else {
      delete err.name;
      names.name = fathersName.name.trim();
    }

    if (!fathersName.bn_name) {
      names.bn_name = '';
    } else if (typeof fathersName.bn_name !== 'string') {
      err.bn_name = {
        text: "Father's Name (Bengali) type must be string!",
        bn_text: 'পিতার নাম (বাংলা) এর ধরন স্ট্রিং হবে!',
      };
    } else if (fathersName.bn_name.trim().length < 3) {
      err.bn_name = {
        text: "Father's Name (Bengali) at least 3 characterrs long!",
        bn_text: 'পিতার নাম (বাংলা) কমপক্ষে ৩ অক্ষর লম্বা হবে!',
      };
    } else {
      delete err.bn_name;
      names.bn_name = fathersName.bn_name.trim();
    }
  }
  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length < 1 ? names : err,
  };
};

const validateMothersName = (mothers) => {
  let err = {};
  let names = {};
  if (typeof mothers !== 'object') {
    err = {
      text: "Mother's Name type must be an object!",
      bn_text: 'মায়ের নামের ধরন অবজেক্ট হবে!',
    };
  } else {
    if (!mothers.name) {
      names.name = '';
    } else if (typeof mothers.name !== 'string') {
      err.name = {
        text: "Mother's Name (English) type must be string!",
        bn_text: 'মায়ের নাম (ইংরেজি) এর ধরন স্ট্রিং হবে!',
      };
    } else if (mothers.name.trim().length < 3) {
      err.name = {
        text: "Mother's Name (English) at least 3 characterrs long!",
        bn_text: 'মায়ের নাম (ইংরেজি) কমপক্ষে ৩ অক্ষর লম্বা হবে!',
      };
    } else {
      delete err.name;
      names.name = mothers.name.trim();
    }

    if (!mothers.bn_name) {
      names.bn_name = '';
    } else if (typeof mothers.bn_name !== 'string') {
      err.bn_name = {
        text: "Mother's Name (Bengali) type must be string!",
        bn_text: 'মায়ের নাম (বাংলা) এর ধরন স্ট্রিং হবে!',
      };
    } else if (mothers.bn_name.trim().length < 3) {
      err.bn_name = {
        text: "Mother's Name (Bengali) at least 3 characterrs long!",
        bn_text: 'মায়ের নাম (বাংলা) কমপক্ষে ৩ অক্ষর লম্বা হবে!',
      };
    } else {
      delete err.bn_name;
      names.bn_name = mothers.bn_name.trim();
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

const validateMobile = (mobile) => {
  let err = null;
  if (typeof mobile !== 'string') {
    err = {
      text: 'Mobile number type must be string!',
      bn_text: 'মোবাইল সংখ্যা এর ধরন স্ট্রিং হবে!',
    };
  } else if (/^[0-9]{11}$/.test(mobile.trim()) === false) {
    err = {
      text: 'Mobile number must be 11 characters of english digit!',
      bn_text: 'মোবাইল সংখ্যা ১১ অক্ষরের ইংরেজি ডিজিট হবে!',
    };
  }

  return {
    valid: !err,
    data: err ?? {
      name: mobile.trim(),
      bn_name: convertEnToBn(mobile.trim()),
    },
  };
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
    const nameRes = validateName(name);
    nameRes.valid
      ? (newPharmacist.name = nameRes.data)
      : (error.name = nameRes.data);
  }

  if (!bn_name) {
    error.name = {
      text: 'Name (Bengali) must not be empty!',
      bn_text: 'নাম (বাংলা) থাকতেই হবে!',
    };
  } else {
    const bnNameRes = validateBnName(bn_name);
    bnNameRes.valid
      ? (newPharmacist.bn_name = bnNameRes.data)
      : (error.bn_name = bnNameRes.data);
  }

  if (!fathersName) {
    newPharmacist.fathersName = { name: '', bn_name: '' };
  } else {
    const fathersNameRes = validateFathersName(fathersName);
    fathersNameRes.valid
      ? (newPharmacist.fathersName = fathersNameRes.data)
      : (error.fathersName = fathersNameRes.data);
  }

  if (!mothersName) {
    newPharmacist.mothersName = { name: '', bn_name: '' };
  } else {
    const mothersNameRes = validateMothersName(mothersName);
    mothersNameRes.valid
      ? (newPharmacist.mothersName = mothersNameRes.data)
      : (error.mothersName = mothersNameRes.data);
  }

  if (!email) {
    newPharmacist.email = '';
  } else {
    const emailRes = validateEmail(email);
    emailRes.valid
      ? (newPharmacist.email = emailRes.data)
      : (error.email = emailRes.data);
  }

  if (!mobile) {
    newPharmacist.mobile = {
      name: '',
      bn_name: '',
    };
  } else {
    const mobileRes = validateMobile(mobile);
    mobileRes.valid
      ? (newPharmacist.mobile = mobileRes.data)
      : (error.mobile = mobileRes.data);
  }

  if (!imageUrl) {
    newPharmacist.imageUrl = '';
  } else if (typeof imageUrl !== 'string') {
    error.imageUrl = {
      text: 'Image URL type must be string!',
      bn_text: 'ইমেজ ইউআরএল এর ধরন স্ট্রিং হবে!',
    };
  } else {
    newPharmacist.imageUrl = imageUrl.trim();
  }

  if (!dateOfBirth) {
    newPharmacist.dateOfBirth = new Date().toISOString();
  } else if (typeof dateOfBirth !== 'string' || dateOfBirth.length !== 24) {
    error.dateOfBirth = {
      text: 'Date of birth is not valid date!',
      bn_text: 'জন্ম তারিখ এর ধরন সঠিক নয়!',
    };
  } else {
    newPharmacist.dateOfBirth = dateOfBirth;
  }

  if (!gender) {
    newPharmacist.gender = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof gender !== 'object') {
    error.gender = {
      text: 'Gender type must be an object!',
      bn_text: 'লিঙ্গের ধরন অবজেক্ট হবে!',
    };
  } else if (Object.keys(gender).length !== 3) {
    error.gender = {
      text: 'Gender is not valid object',
      bn_text: 'লিঙ্গ সঠিক অবজেক্ট নয়',
    };
  } else {
    newPharmacist.gender = gender;
  }

  if (!nationalId) {
    newPharmacist.nationalId = {
      name: '',
      bn_name: '',
    };
  } else {
    if (typeof nationalId !== 'string') {
      error.nationalId = {
        text: 'National ID number type must be string!',
        bn_text: 'জাতীয় পরিচয়পত্র সংখ্যা এর ধরন স্ট্রিং হবে!',
      };
    } else if (/^\d+$/.test(nationalId.trim()) === false) {
      error.nationalId = {
        text: 'National ID number characters must be digit',
        bn_text: 'জাতীয় পরিচয়পত্র সংখ্যা ইংরেজি ডিজিট হবে!',
      };
    } else {
      newPharmacist.nationalId = {
        name: nationalId.trim(),
        bn_name: convertEnToBn(nationalId.trim()),
      };
    }
  }

  if (!passingYear) {
    newPharmacist.passingYear = {
      name: '',
      bn_name: '',
    };
  } else {
    if (typeof passingYear !== 'string') {
      error.passingYear = {
        text: 'Passing year number type must be string!',
        bn_text: 'পাশের বছর এর ধরন স্ট্রিং হবে!',
      };
    } else if (/^[0-9]{4}$/.test(passingYear.trim()) === false) {
      error.passingYear = {
        text: 'Passing year number must be 11 characters of english digit!',
        bn_text: 'পাশের বছর ৪ অক্ষরের ইংরেজি ডিজিট হবে!',
      };
    } else {
      newPharmacist.passingYear = {
        name: passingYear.trim(),
        bn_name: convertEnToBn(passingYear.trim()),
      };
    }
  }

  if (!memberId) {
    newPharmacist.memberId = '';
  } else if (typeof memberId !== 'string') {
    error.memberId = {
      text: 'Member ID number type must be string!',
      bn_text: 'সদস্য পরিচয়পত্র সংখ্যা এর ধরন স্ট্রিং হবে!',
    };
  } else {
    newPharmacist.memberId = memberId;
  }

  if (!dateOfJoin) {
    newPharmacist.dateOfJoin = null;
  } else if (typeof dateOfJoin !== 'string' || dateOfJoin.length !== 24) {
    error.dateOfJoin = {
      text: 'Date of join is not valid date!',
      bn_text: 'যোগদানের তারিখ এর ধরন সঠিক নয়!',
    };
  } else {
    newPharmacist.dateOfJoin = dateOfJoin;
  }

  if (!jobDepertment) {
    newPharmacist.jobDepertment = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof jobDepertment !== 'object') {
    error.jobDepertment = {
      text: 'Job depertment type must be an object!',
      bn_text: 'চাকুরির বিভাগের ধরন অবজেক্ট হবে!',
    };
  } else if (Object.keys(jobDepertment).length !== 3) {
    error.jobDepertment = {
      text: 'Job depertment is not valid object',
      bn_text: 'চাকুরির বিভাগ সঠিক অবজেক্ট নয়',
    };
  } else {
    newPharmacist.jobDepertment = jobDepertment;
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
    const nameRes = validateName(name);
    nameRes.valid
      ? (newPharmacist.name = nameRes.data)
      : (error.name = nameRes.data);
  }

  if (bn_name) {
    const bnNameRes = validateName(bn_name);
    bnNameRes.valid
      ? (newPharmacist.bn_name = bnNameRes.data)
      : (error.bn_name = bnNameRes.data);
  }

  if (fathersName) {
    const fathersNameRes = validateFathersName(fathersName);
    fathersNameRes.valid
      ? (newPharmacist.fathersName = fathersNameRes.data)
      : (error.fathersName = fathersNameRes.data);
  }

  if (mothersName) {
    const mothersNameRes = validateMothersName(mothersName);
    mothersNameRes.valid
      ? (newPharmacist.mothersName = mothersNameRes.data)
      : (error.mothersName = mothersNameRes.data);
  }

  if (email) {
    const emailRes = validateEmail(email);
    emailRes.valid
      ? (newPharmacist.email = emailRes.data)
      : (error.email = emailRes.data);
  }

  if (mobile) {
    const mobileRes = validateMobile(mobile);
    mobileRes.valid
      ? (newPharmacist.mobile = mobileRes.data)
      : (error.mobile = mobileRes.data);
  }

  if (imageUrl) {
    if (typeof imageUrl !== 'string') {
      error.imageUrl = 'Image URL type must be string!';
    } else {
      newPharmacist.imageUrl = imageUrl.trim();
    }
  }

  if (dateOfBirth) {
    if (typeof dateOfBirth !== 'string' || dateOfBirth.length !== 24) {
      error.dateOfBirth = 'Date of birth is not valid date!';
    } else {
      newPharmacist.dateOfBirth = dateOfBirth;
    }
  }

  if (gender) {
    if (typeof gender !== 'string') {
      error.gender = 'Gender type must be string!';
    } else {
      newPharmacist.gender = gender.trim();
    }
  }

  if (nationalId) {
    if (/^\d+$/.test(nationalId.trim()) === false) {
      error.nationalId = 'National ID number characters must be digit!';
    } else {
      newPharmacist.nationalId = nationalId.trim();
    }
  }

  if (passingYear) {
    if (typeof passingYear !== 'string') {
      error.passingYear = 'Diploma passing year type must be string!';
    } else if (/^[0-9]{4}/.test(passingYear.trim()) === false) {
      error.passingYear = 'Diploma passing year must be 4 characters of digit!';
    } else if (passingYear.trim().length > 4) {
      error.passingYear = 'Diploma passing year must be 4 characters long!';
    } else {
      newPharmacist.passingYear = passingYear.trim();
    }
  }

  if (memberId) {
    if (typeof memberId !== 'string') {
      error.memberId = 'Member ID type must be string!';
    } else {
      newPharmacist.memberId = memberId;
    }
  }

  if (dateOfJoin) {
    if (typeof dateOfJoin !== 'string' || dateOfJoin.length !== 24) {
      error.dateOfJoin = 'Date of join is not valid date!';
    } else {
      newPharmacist.dateOfJoin = dateOfJoin;
    }
  }

  if (jobDepertment) {
    if (typeof jobDepertment !== 'string') {
      error.jobDepertment = 'Job depertment type must be string!';
    } else {
      newPharmacist.jobDepertment = jobDepertment;
    }
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
