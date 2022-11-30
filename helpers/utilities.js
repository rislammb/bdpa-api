const validateRegNum = (regNumber) => {
  let reg = '';
  let err = {};

  if (!regNumber) {
    err.regNumber = 'Registration number must not be empty!';
  } else if (typeof regNumber !== 'string') {
    err.regNumber = 'Registration number type must be string';
  } else if (/^[B-]{2}/.test(regNumber.trim()) === false) {
    err.regNumber = `Registration number must start with 'B-'!`;
  } else if (regNumber.trim().length < 6) {
    err.regNumber = 'Registration number must at least 6 characters long!';
  } else {
    reg = regNumber.trim();
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : reg,
  };
};

const validateDivision = (value, areaName) => {
  let obj = {};
  let error = '';

  if (!value) {
    obj = {
      id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof value !== 'object') {
    error = `${areaName} division type is not object!`;
  } else if (Object.keys(value).length !== 3) {
    error = `${areaName} division is not valid object!`;
  } else {
    obj = value;
  }

  return { valid: !error, data: error ? error : obj };
};

const validateDistrict = (value, areaName) => {
  let obj = {};
  let error = '';

  if (!value) {
    obj = {
      id: '',
      division_id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof value !== 'object') {
    error = `${areaName} district type is not object!`;
  } else if (Object.keys(value).length !== 4) {
    error = `${areaName} district is not valid object!`;
  } else {
    obj = value;
  }

  return { valid: !error, data: error ? error : obj };
};

const validateUpazila = (value, areaName) => {
  let obj = {};
  let error = '';

  if (!value) {
    obj = {
      id: '',
      district_id: '',
      name: '',
      bn_name: '',
    };
  } else if (typeof value !== 'object') {
    error = `${areaName} upazila type is not object!`;
  } else if (Object.keys(value).length !== 4) {
    error = `${areaName} upazila is not valid object!`;
  } else {
    obj = value;
  }

  return { valid: !error, data: error ? error : obj };
};

const validatePlace = (value, areaName) => {
  let res = '';
  let error = '';

  if (!value) {
    res = '';
  } else if (typeof value !== 'string') {
    error = `${areaName} place type must be string!`;
  } else if (value.trim().length < 3) {
    error = `${areaName} place at least 3 characters long!`;
  } else {
    res = value.trim();
  }

  return { valid: !error, data: error ? error : res };
};

const validatePostBody = ({
  regNumber,
  name,
  bn_name,
  email,
  mobile,
  dateOfBirth,
  gender,
  passingYear,
  dateOfJoin,
  jobDepertment,
  postingDivision,
  postingDistrict,
  postingUpazila,
  postingPlace,
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
    error.name = 'Name must not be empty!';
  } else if (typeof name !== 'string') {
    error.name = 'Name type must be string!';
  } else if (name.trim().length < 2) {
    error.name = 'Name must at least 2 characters long!';
  } else {
    newPharmacist.name = name.trim();
  }

  if (!bn_name) {
    newPharmacist.bn_name = '';
  } else if (typeof bn_name !== 'string') {
    error.bn_name = 'Name (Bengali) type must be string!';
  } else if (bn_name.trim().length < 2) {
    error.bn_name = 'Name (Bengali) must at least 2 characters long!';
  } else {
    newPharmacist.bn_name = bn_name.trim();
  }

  if (!email) {
    newPharmacist.email = '';
  } else if (typeof email !== 'string') {
    error.email = 'Email type must be string!';
  } else if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    // TODO: validate email
    error.email = 'Email is not valid!';
  } else {
    newPharmacist.email = email.trim();
  }

  if (!mobile) {
    newPharmacist.mobile = '';
  } else if (typeof mobile !== 'string') {
    error.mobile = 'Mobile number type must be string!';
  } else if (/^[0-9]{11}/.test(mobile.trim()) === false) {
    error.mobile = 'Mobile number must be 11 characters of digit!';
  } else if (mobile.trim().length > 11) {
    error.mobile = 'Mobile number must be 11 characters long!';
  } else {
    newPharmacist.mobile = mobile.trim();
  }

  if (!dateOfBirth) {
    newPharmacist.dateOfBirth = new Date().toISOString();
  } else if (typeof dateOfBirth !== 'string' || dateOfBirth.length !== 24) {
    error.dateOfBirth = 'Date of birth is not valid date!';
  } else {
    newPharmacist.dateOfBirth = dateOfBirth;
  }

  if (!gender) {
    newPharmacist.gender = '';
  } else if (typeof gender !== 'string') {
    error.gender = 'Gender type must be string!';
  } else {
    newPharmacist.gender = gender.trim();
  }

  if (!passingYear) {
    newPharmacist.passingYear = '';
  } else if (typeof passingYear !== 'string') {
    error.passingYear = 'Diploma passing year type must be string!';
  } else if (/^[0-9]{4}/.test(passingYear.trim()) === false) {
    error.passingYear = 'Diploma passing year must be 4 characters of digit!';
  } else if (passingYear.trim().length > 4) {
    error.passingYear = 'Diploma passing year must be 4 characters long!';
  } else {
    newPharmacist.passingYear = passingYear.trim();
  }

  if (!dateOfJoin) {
    newPharmacist.dateOfJoin = new Date().toISOString();
  } else if (typeof dateOfJoin !== 'string' || dateOfJoin.length !== 24) {
    error.dateOfJoin = 'Date of join is not valid date!';
  } else {
    newPharmacist.dateOfJoin = dateOfJoin;
  }

  if (!jobDepertment) {
    newPharmacist.jobDepertment = '';
  } else if (typeof jobDepertment !== 'string') {
    error.jobDepertment = 'Job depertment type must be string!';
  } else {
    newPharmacist.jobDepertment = jobDepertment;
  }

  const postDivRes = validateDivision(postingDivision, 'Posting');
  postDivRes.valid
    ? (newPharmacist.postingDivision = postDivRes.data)
    : (error.postingDivision = postDivRes.data);

  const postDistRes = validateDistrict(postingDistrict, 'Posting');
  postDistRes.valid
    ? (newPharmacist.postingDistrict = postDistRes.data)
    : (error.postingDistrict = postDistRes.data);

  const postUpaRes = validateUpazila(postingUpazila, 'Posting');
  postUpaRes.valid
    ? (newPharmacist.postingUpazila = postUpaRes.data)
    : (error.postingUpazila = postUpaRes.data);

  const postPlaceRes = validatePlace(postingPlace, 'Posting');
  postPlaceRes.valid
    ? (newPharmacist.postingPlace = postPlaceRes.data)
    : (error.postingPlace = postPlaceRes.data);

  const voterDivRes = validateDivision(voterDivision, 'Voter');
  voterDivRes.valid
    ? (newPharmacist.voterDivision = voterDivRes.data)
    : (error.voterDivision = voterDivRes.data);

  const voterDistRes = validateDistrict(voterDistrict, 'Voter');
  voterDistRes.valid
    ? (newPharmacist.voterDistrict = voterDistRes.data)
    : (error.voterDistrict = voterDistRes.data);

  if (!onDeputation) {
    newPharmacist.onDeputation = 'No';
  } else if (typeof onDeputation !== 'string') {
    error.onDeputation = 'Deputation type must be string!';
  } else {
    newPharmacist.onDeputation = onDeputation.trim();
  }

  if (newPharmacist.onDeputation === 'Yes') {
    const depuDivRes = validateDivision(deputationDivision, 'Deputation');
    depuDivRes.valid
      ? (newPharmacist.deputationDivision = depuDivRes.data)
      : (error.deputationDivision = depuDivRes.data);

    const depuDistRes = validateDistrict(deputationDistrict, 'Deputation');
    depuDistRes.valid
      ? (newPharmacist.deputationDistrict = depuDistRes.data)
      : (error.deputationDistrict = depuDistRes.data);

    const depuUpaRes = validateUpazila(deputationUpazila, 'Deputation');
    depuUpaRes.valid
      ? (newPharmacist.deputationUpazila = depuUpaRes.data)
      : (error.deputationUpazila = depuUpaRes.data);

    const depuPlaceRes = validatePlace(deputationPlace, 'Deputation');
    depuPlaceRes.valid
      ? (newPharmacist.deputationPlace = depuPlaceRes.data)
      : (error.deputationPlace = depuPlaceRes.data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newPharmacist,
  };
};

const validatePutBody = ({
  name,
  bn_name,
  email,
  mobile,
  dateOfBirth,
  gender,
  passingYear,
  dateOfJoin,
  jobDepertment,
  postingDivision,
  postingDistrict,
  postingUpazila,
  postingPlace,
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
    if (typeof name !== 'string') {
      error.name = 'Name type must be string!';
    } else if (name.trim().length < 2) {
      error.name = 'Name must at least 2 characters long!';
    } else {
      newPharmacist.name = name.trim();
    }
  }

  if (bn_name) {
    if (typeof bn_name !== 'string') {
      error.bn_name = 'Name (Bengali) type must be string!';
    } else if (bn_name.trim().length < 2) {
      error.bn_name = 'Name (Bengali) must at least 2 characters long!';
    } else {
      newPharmacist.bn_name = bn_name.trim();
    }
  }

  if (email) {
    if (typeof email !== 'string') {
      error.email = 'Email type must be string!';
    } else if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      error.email = 'Email is not valid!';
    } else {
      newPharmacist.email = email.trim();
    }
  }

  if (mobile) {
    if (typeof mobile !== 'string') {
      error.mobile = 'Mobile number type must be string!';
    } else if (/^[0-9]{11}/.test(mobile.trim()) === false) {
      error.mobile = 'Mobile number must be 11 characters of digit!';
    } else if (mobile.trim().length > 11) {
      error.mobile = 'Mobile number must be 11 characters long!';
    } else {
      newPharmacist.mobile = mobile.trim();
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
    const postDivRes = validateDivision(postingDivision, 'Posting');
    postDivRes.valid
      ? (newPharmacist.postingDivision = postDivRes.data)
      : (error.postingDivision = postDivRes.data);
  }
  if (postingDistrict) {
    const postDistRes = validateDistrict(postingDistrict, 'Posting');
    postDistRes.valid
      ? (newPharmacist.postingDistrict = postDistRes.data)
      : (error.postingDistrict = postDistRes.data);
  }
  if (postingUpazila) {
    const postUpaRes = validateUpazila(postingUpazila, 'Posting');
    postUpaRes.valid
      ? (newPharmacist.postingUpazila = postUpaRes.data)
      : (error.postingUpazila = postUpaRes.data);
  }
  if (postingPlace) {
    const postPlaceRes = validatePlace(postingPlace, 'Posting');
    postPlaceRes.valid
      ? (newPharmacist.postingPlace = postPlaceRes.data)
      : (error.postingPlace = postPlaceRes.data);
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
  }

  if (deputationDivision) {
    const depuDivRes = validateDivision(deputationDivision, 'Deputation');
    depuDivRes.valid
      ? (newPharmacist.deputationDivision = depuDivRes.data)
      : (error.deputationDivision = depuDivRes.data);
  }

  if (deputationDistrict) {
    const depuDistRes = validateDistrict(deputationDistrict, 'Deputation');
    depuDistRes.valid
      ? (newPharmacist.deputationDistrict = depuDistRes.data)
      : (error.deputationDistrict = depuDistRes.data);
  }

  if (deputationUpazila) {
    const depuUpaRes = validateUpazila(deputationUpazila, 'Deputation');
    depuUpaRes.valid
      ? (newPharmacist.deputationUpazila = depuUpaRes.data)
      : (error.deputationUpazila = depuUpaRes.data);
  }

  if (deputationPlace) {
    const depuPlaceRes = validatePlace(deputationPlace, 'Deputation');
    depuPlaceRes.valid
      ? (newPharmacist.deputationPlace = depuPlaceRes.data)
      : (error.deputationPlace = depuPlaceRes.data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newPharmacist,
  };
};

module.exports = { validateRegNum, validatePostBody, validatePutBody };
