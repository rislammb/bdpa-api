const fathersNameProperty = require("../constant/fathersNameProperty");
const genderProperty = require("../constant/genderProperty");
const instituteProperty = require("../constant/instituteProperty");
const mothersNameProperty = require("../constant/mothersNameProperty");
const jobDepartmentProperty = require("../constant/jobDepartmentProperty");
const onDeputationProperty = require("../constant/onDeputationProperty");
const { enToBnNumber } = require("./number");
const {
  validateString,
  validateStringNumber,
  validateDate,
} = require("./validation");

const validateRegNum = (regNumber) => {
  let res = "";
  let err = {};

  if (!regNumber) {
    err.text = "Registration number must not be empty!";
    err.bn_text = "নিবন্ধন সংখ্যা থাকতে হবে!";
  } else if (typeof regNumber !== "string") {
    err.text = "Registration number type must be string";
    err.bn_text = "নিবন্ধন সংখ্যার ধরন স্ট্রিং হবে";
  } else {
    const trimedNumber = regNumber.trim().replace(/ /g, "");

    if (/^[B-]{2}/.test(trimedNumber) === false) {
      err.text = `Registration number must start with 'B-'!`;
      err.bn_text = `নিবন্ধন সংখ্যা 'B-' দ্বারা শুরু হবে!`;
    } else if (trimedNumber.length < 6) {
      err.text =
        "Registration number must at least 6 characters long without space!";
      err.bn_text = "নিবন্ধন সংখ্যা স্পেস বাদে কমপক্ষে ৬ অক্ষর লম্বা হবে!";
    } else {
      res = trimedNumber;
    }
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length > 0 ? err : res,
  };
};

const validateStringObject = (object, text = "", bn_text = "") => {
  let err = {};
  let names = {};

  if (typeof object !== "object") {
    err = {
      text: `${text} type must be an object!`,
      bn_text: `${bn_text} এর ধরন অবজেক্ট হবে!`,
    };
  } else {
    const mapProperty = (array) =>
      array.map((item) => {
        if (!object[item.name]) {
          names[item.name] = "";
        } else if (typeof object[item.name] !== "string") {
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
    } else if (text === "Institute name") {
      if (Object.keys(object).length !== instituteProperty.length) {
        err = {
          text: `${text} type object must be ${instituteProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            instituteProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(instituteProperty);
    } else if (text === "Gender") {
      if (Object.keys(object).length !== genderProperty.length) {
        err = {
          text: `${text} type object must be ${genderProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            genderProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(genderProperty);
    } else if (text === "Job department") {
      if (Object.keys(object).length !== jobDepartmentProperty.length) {
        err = {
          text: `${text} type object must be ${jobDepartmentProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            jobDepartmentProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(jobDepartmentProperty);
    } else if (text === "On deputation/attachment") {
      if (Object.keys(object).length !== onDeputationProperty.length) {
        err = {
          text: `${text} type object must be ${onDeputationProperty.length} property!`,
          bn_text: `${bn_text} অবজেক্টে ${enToBnNumber(
            onDeputationProperty.length
          )} টি প্রপার্টি থাকতে হবে!`,
        };
      } else mapProperty(onDeputationProperty);
    }
  }

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length < 1 ? names : err,
  };
};

const validateEmail = (email) => {
  let err = null;
  if (typeof email !== "string") {
    err = {
      text: "Email type must be string!",
      bn_text: "ইমেইল এর ধরন স্ট্রিং হবে!",
    };
  } else if (
    !String(email.trim())
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    err = {
      text: "Email is not valid!",
      bn_text: "ইমেইল সঠিক নয়!",
    };
  }

  return { valid: !err, data: err ?? email.trim().toLowerCase() };
};

const enAreaToBnArea = {
  Posting: "কর্মস্থল/ঠিকানা",
  Voter: "ভোটার",
  Permanent: "স্থায়ী",
  Deputation: "প্রেষন/সংযুক্ত",
};

const validateDivision = (value, areaName) => {
  let res = {};
  let err = {};

  if (!value) {
    res = {
      id: "",
      name: "",
      bn_name: "",
    };
  } else if (typeof value !== "object") {
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
      id: "",
      division_id: "",
      name: "",
      bn_name: "",
    };
  } else if (typeof value !== "object") {
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
      id: "",
      district_id: "",
      name: "",
      bn_name: "",
    };
  } else if (typeof value !== "object") {
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
    res = { name: "", bn_name: "" };
  } else if (typeof value !== "object") {
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

const validatePostPharmacist = ({
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
  jobDepartment,
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
      text: "Name (English) must not be empty!",
      bn_text: "নাম (ইংরেজি) থাকতেই হবে!",
    };
  } else {
    const { valid, data } = validateString(
      name,
      "Name (English)",
      "নাম (ইংরেজি)",
      3
    );
    valid ? (newPharmacist.name = data) : (error.name = data);
  }

  if (!bn_name) {
    error.bn_name = {
      text: "Name (Bengali) must not be empty!",
      bn_text: "নাম (বাংলা) থাকতেই হবে!",
    };
  } else {
    const { valid, data } = validateString(
      bn_name,
      "Name (Bengali)",
      "নাম (বাংলা)",
      3
    );
    valid ? (newPharmacist.bn_name = data) : (error.bn_name = data);
  }

  if (!fathersName) {
    newPharmacist.fathersName = { name: "", bn_name: "" };
  } else {
    const { valid, data } = validateStringObject(
      fathersName,
      "Father's name",
      "পিতার নাম"
    );
    valid ? (newPharmacist.fathersName = data) : (error.fathersName = data);
  }

  if (!mothersName) {
    newPharmacist.mothersName = { name: "", bn_name: "" };
  } else {
    const { valid, data } = validateStringObject(
      mothersName,
      "Mothers's name",
      "মায়ের নাম"
    );
    valid ? (newPharmacist.mothersName = data) : (error.mothersName = data);
  }

  if (!email) {
    newPharmacist.email = "";
  } else {
    const { valid, data } = validateEmail(email);
    valid ? (newPharmacist.email = data) : (error.email = data);
  }

  if (!mobile) {
    newPharmacist.mobile = {
      name: "",
      bn_name: "",
    };
  } else {
    const { valid, data } = validateStringNumber(
      mobile,
      "Mobile number",
      "মোবাইল নাম্বার",
      11
    );
    valid ? (newPharmacist.mobile = data) : (error.mobile = data);
  }

  if (!imageUrl) {
    newPharmacist.imageUrl = "";
  } else {
    const { valid, data } = validateString(
      imageUrl,
      "Image URL",
      "ইমেজ ইউআরএল"
    );
    if (valid) {
      newPharmacist.imageUrl = data;
      newPharmacist.mainImageUrl = data;
    } else error.imageUrl = data;
  }

  if (!dateOfBirth) {
    newPharmacist.dateOfBirth = new Date().toISOString();
  } else {
    const { valid, data } = validateDate(
      dateOfBirth,
      "Date of birth",
      "জন্ম তারিখ"
    );
    valid ? (newPharmacist.dateOfBirth = data) : (error.dateOfBirth = data);
  }

  if (!gender) {
    newPharmacist.gender = {
      id: "",
      name: "",
      bn_name: "",
    };
  } else {
    const { valid, data } = validateStringObject(gender, "Gender", "লিঙ্গ");
    valid ? (newPharmacist.gender = data) : (error.gender = data);
  }

  if (!nationalId) {
    newPharmacist.nationalId = {
      name: "",
      bn_name: "",
    };
  } else {
    const { valid, data } = validateStringNumber(
      nationalId,
      "National ID number",
      "জাতীয় পরিচয়পত্র সংখ্যা"
    );
    valid ? (newPharmacist.nationalId = data) : (error.nationalId = data);
  }

  if (!institute) {
    newPharmacist.institute = { name: "", bn_name: "" };
  } else {
    const { valid, data } = validateStringObject(
      institute,
      "Institute name",
      "ইন্সটিটিউটের নাম"
    );
    valid ? (newPharmacist.institute = data) : (error.institute = data);
  }

  if (!passingYear) {
    newPharmacist.passingYear = {
      name: "",
      bn_name: "",
    };
  } else {
    const { valid, data } = validateStringNumber(
      passingYear,
      "Passing year",
      "পাশের বছর",
      4
    );
    valid ? (newPharmacist.passingYear = data) : (error.passingYear = data);
  }

  if (!memberId) {
    newPharmacist.memberId = "";
  } else {
    const { valid, data } = validateString(
      memberId,
      "Member ID number",
      "সদস্য পরিচয়পত্র সংখ্যা"
    );
    valid ? (newPharmacist.memberId = data) : (error.memberId = data);
  }

  if (!dateOfJoin) {
    newPharmacist.dateOfJoin = null;
  } else {
    const { valid, data } = validateDate(
      dateOfJoin,
      "Date of join",
      "যোগদানের তারিখ"
    );
    valid ? (newPharmacist.dateOfJoin = data) : (error.dateOfJoin = data);
  }

  if (!jobDepartment) {
    newPharmacist.jobDepartment = {
      id: "",
      name: "",
      bn_name: "",
    };
  } else {
    const { valid, data } = validateStringObject(
      jobDepartment,
      "Job department",
      "চাকুরির বিভাগ"
    );
    valid ? (newPharmacist.jobDepartment = data) : (error.jobDepartment = data);
  }

  const postingDivRes = validateDivision(postingDivision, "Posting");
  postingDivRes.valid
    ? (newPharmacist.postingDivision = postingDivRes.data)
    : (error.postingDivision = postingDivRes.data);

  const postingDistRes = validateDistrict(postingDistrict, "Posting");
  postingDistRes.valid
    ? (newPharmacist.postingDistrict = postingDistRes.data)
    : (error.postingDistrict = postingDistRes.data);

  const postingUpaRes = validateUpazila(postingUpazila, "Posting");
  postingUpaRes.valid
    ? (newPharmacist.postingUpazila = postingUpaRes.data)
    : (error.postingUpazila = postingUpaRes.data);

  const postingPlaceRes = validatePlace(postingPlace, "Posting");
  postingPlaceRes.valid
    ? (newPharmacist.postingPlace = postingPlaceRes.data)
    : (error.postingPlace = postingPlaceRes.data);

  const permanentDivRes = validateDivision(permanentDivision, "Permanent");
  permanentDivRes.valid
    ? (newPharmacist.permanentDivision = permanentDivRes.data)
    : (error.permanentDivision = permanentDivRes.data);

  const permanentDistRes = validateDistrict(permanentDistrict, "Permanent");
  permanentDistRes.valid
    ? (newPharmacist.permanentDistrict = permanentDistRes.data)
    : (error.permanentDistrict = permanentDistRes.data);

  const permanentUpaRes = validateUpazila(permanentUpazila, "Permanent");
  permanentUpaRes.valid
    ? (newPharmacist.permanentUpazila = permanentUpaRes.data)
    : (error.permanentUpazila = permanentUpaRes.data);

  const permanentPlaceRes = validatePlace(permanentPlace, "Permanent");
  permanentPlaceRes.valid
    ? (newPharmacist.permanentPlace = permanentPlaceRes.data)
    : (error.permanentPlace = permanentPlaceRes.data);

  const voterDivRes = validateDivision(voterDivision, "Voter");
  voterDivRes.valid
    ? (newPharmacist.voterDivision = voterDivRes.data)
    : (error.voterDivision = voterDivRes.data);

  const voterDistRes = validateDistrict(voterDistrict, "Voter");
  voterDistRes.valid
    ? (newPharmacist.voterDistrict = voterDistRes.data)
    : (error.voterDistrict = voterDistRes.data);

  if (!onDeputation) {
    newPharmacist.onDeputation = {
      id: "",
      name: "",
      bn_name: "",
    };
  } else {
    const { valid, data } = validateStringObject(
      onDeputation,
      "On deputation/attachment",
      "প্রেষন/সংযুক্ত"
    );
    valid ? (newPharmacist.onDeputation = data) : (error.onDeputation = data);
  }

  if (newPharmacist.onDeputation?.name === "Yes") {
    const deputationDivRes = validateDivision(deputationDivision, "Deputation");
    deputationDivRes.valid
      ? (newPharmacist.deputationDivision = deputationDivRes.data)
      : (error.deputationDivision = deputationDivRes.data);

    const deputationDistRes = validateDistrict(
      deputationDistrict,
      "Deputation"
    );
    deputationDistRes.valid
      ? (newPharmacist.deputationDistrict = deputationDistRes.data)
      : (error.deputationDistrict = deputationDistRes.data);

    const deputationUpaRes = validateUpazila(deputationUpazila, "Deputation");
    deputationUpaRes.valid
      ? (newPharmacist.deputationUpazila = deputationUpaRes.data)
      : (error.deputationUpazila = deputationUpaRes.data);

    const deputationPlaceRes = validatePlace(deputationPlace, "Deputation");
    deputationPlaceRes.valid
      ? (newPharmacist.deputationPlace = deputationPlaceRes.data)
      : (error.deputationPlace = deputationPlaceRes.data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newPharmacist,
  };
};

const validateUpdatePharmacist = ({
  name,
  bn_name,
  fathersName,
  mothersName,
  email,
  mobile,
  mainImageUrl,
  imageUrl,
  dateOfBirth,
  gender,
  nationalId,
  institute,
  passingYear,
  memberId,
  dateOfJoin,
  jobDepartment,
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

  if (name !== undefined) {
    const { valid, data } = validateString(
      name,
      "Name (English)",
      "নাম (ইংরেজি)",
      3
    );
    valid ? (newPharmacist.name = data) : (error.name = data);
  }

  if (bn_name !== undefined) {
    const { valid, data } = validateString(
      bn_name,
      "Name (Bengali)",
      "নাম (বাংলা)",
      3
    );
    valid ? (newPharmacist.bn_name = data) : (error.bn_name = data);
  }

  if (fathersName !== undefined) {
    const { valid, data } = validateStringObject(
      fathersName,
      "Father's name",
      "পিতার নাম"
    );
    valid ? (newPharmacist.fathersName = data) : (error.fathersName = data);
  }

  if (mothersName !== undefined) {
    const { valid, data } = validateStringObject(
      mothersName,
      "Mothers's name",
      "মায়ের নাম"
    );
    valid ? (newPharmacist.mothersName = data) : (error.mothersName = data);
  }

  if (email !== undefined) {
    if (email === "") {
      newPharmacist.email = "";
    } else {
      const { valid, data } = validateEmail(email);
      valid ? (newPharmacist.email = data) : (error.email = data);
    }
  }

  if (mobile !== undefined) {
    if (mobile === "") {
      newPharmacist.mobile = { name: "", bn_name: "" };
    } else {
      const { valid, data } = validateStringNumber(
        mobile,
        "Mobile number",
        "মোবাইল নাম্বার",
        11
      );
      valid ? (newPharmacist.mobile = data) : (error.mobile = data);
    }
  }

  if (mainImageUrl !== undefined) {
    if (mainImageUrl === "") {
      newPharmacist.mainImageUrl = "";
    } else {
      const { valid, data } = validateString(
        mainImageUrl,
        "Main Image URL",
        "প্রধান ইমেজ ইউআরএল",
        11
      );
      valid ? (newPharmacist.mainImageUrl = data) : (error.mainImageUrl = data);
    }
  }

  if (imageUrl !== undefined) {
    if (imageUrl === "") {
      newPharmacist.imageUrl = "";
    } else {
      const { valid, data } = validateString(
        imageUrl,
        "Image URL",
        "ইমেজ ইউআরএল",
        11
      );
      valid ? (newPharmacist.imageUrl = data) : (error.imageUrl = data);
    }
  }

  if (dateOfBirth !== undefined) {
    const { valid, data } = validateDate(
      dateOfBirth,
      "Date of birth",
      "জন্ম তারিখ"
    );
    valid ? (newPharmacist.dateOfBirth = data) : (error.dateOfBirth = data);
  }

  if (gender !== undefined) {
    const { valid, data } = validateStringObject(gender, "Gender", "লিঙ্গ");
    valid ? (newPharmacist.gender = data) : (error.gender = data);
  }

  if (nationalId !== undefined) {
    if (nationalId === "") {
      newPharmacist.nationalId = { name: "", bn_name: "" };
    } else {
      const { valid, data } = validateStringNumber(
        nationalId,
        "National ID number",
        "জাতীয় পরিচয়পত্র সংখ্যা"
      );
      valid ? (newPharmacist.nationalId = data) : (error.nationalId = data);
    }
  }

  if (institute !== undefined) {
    const { valid, data } = validateStringObject(
      institute,
      "Institute name",
      "ইন্সটিটিউটের নাম"
    );
    valid ? (newPharmacist.institute = data) : (error.institute = data);
  }

  if (passingYear !== undefined) {
    if (passingYear === "") {
      newPharmacist.passingYear = { name: "", bn_name: "" };
    } else {
      const { valid, data } = validateStringNumber(
        passingYear,
        "Passing year",
        "পাশের বছর",
        4
      );
      valid ? (newPharmacist.passingYear = data) : (error.passingYear = data);
    }
  }

  if (memberId !== undefined) {
    const { valid, data } = validateString(
      memberId,
      "Member ID number",
      "সদস্য পরিচয়পত্র সংখ্যা"
    );
    valid ? (newPharmacist.memberId = data) : (error.memberId = data);
  }

  if (dateOfJoin !== undefined) {
    const { valid, data } = validateDate(
      dateOfJoin,
      "Date of join",
      "যোগদানের তারিখ"
    );
    valid ? (newPharmacist.dateOfJoin = data) : (error.dateOfJoin = data);
  }

  if (jobDepartment !== undefined) {
    const { valid, data } = validateStringObject(
      jobDepartment,
      "Job department",
      "চাকুরির বিভাগ"
    );
    valid ? (newPharmacist.jobDepartment = data) : (error.jobDepartment = data);
  }

  if (postingDivision !== undefined) {
    const postingDivRes = validateDivision(postingDivision, "Posting");
    postingDivRes.valid
      ? (newPharmacist.postingDivision = postingDivRes.data)
      : (error.postingDivision = postingDivRes.data);
  }
  if (postingDistrict !== undefined) {
    const postingDistRes = validateDistrict(postingDistrict, "Posting");
    postingDistRes.valid
      ? (newPharmacist.postingDistrict = postingDistRes.data)
      : (error.postingDistrict = postingDistRes.data);
  }
  if (postingUpazila !== undefined) {
    const postingUpaRes = validateUpazila(postingUpazila, "Posting");
    postingUpaRes.valid
      ? (newPharmacist.postingUpazila = postingUpaRes.data)
      : (error.postingUpazila = postingUpaRes.data);
  }
  if (postingPlace !== undefined) {
    const postingPlaceRes = validatePlace(postingPlace, "Posting");
    postingPlaceRes.valid
      ? (newPharmacist.postingPlace = postingPlaceRes.data)
      : (error.postingPlace = postingPlaceRes.data);
  }

  if (permanentDivision !== undefined) {
    const permanentDivRes = validateDivision(permanentDivision, "Permanent");
    permanentDivRes.valid
      ? (newPharmacist.permanentDivision = permanentDivRes.data)
      : (error.permanentDivision = permanentDivRes.data);
  }
  if (permanentDistrict !== undefined) {
    const permanentDistRes = validateDistrict(permanentDistrict, "Permanent");
    permanentDistRes.valid
      ? (newPharmacist.permanentDistrict = permanentDistRes.data)
      : (error.permanentDistrict = permanentDistRes.data);
  }
  if (permanentUpazila !== undefined) {
    const permanentUpaRes = validateUpazila(permanentUpazila, "Permanent");
    permanentUpaRes.valid
      ? (newPharmacist.permanentUpazila = permanentUpaRes.data)
      : (error.permanentUpazila = permanentUpaRes.data);
  }
  if (permanentPlace !== undefined) {
    const permanentPlaceRes = validatePlace(permanentPlace, "Permanent");
    permanentPlaceRes.valid
      ? (newPharmacist.permanentPlace = permanentPlaceRes.data)
      : (error.permanentPlace = permanentPlaceRes.data);
  }

  if (voterDivision !== undefined) {
    const voterDivRes = validateDivision(voterDivision, "Voter");
    voterDivRes.valid
      ? (newPharmacist.voterDivision = voterDivRes.data)
      : (error.voterDivision = voterDivRes.data);
  }
  if (voterDistrict !== undefined) {
    const voterDistRes = validateDistrict(voterDistrict, "Voter");
    voterDistRes.valid
      ? (newPharmacist.voterDistrict = voterDistRes.data)
      : (error.voterDistrict = voterDistRes.data);
  }

  if (onDeputation !== undefined) {
    const { valid, data } = validateStringObject(
      onDeputation,
      "On deputation/attachment",
      "প্রেষন/সংযুক্ত"
    );

    valid ? (newPharmacist.onDeputation = data) : (error.onDeputation = data);

    if (onDeputation.name === "No") {
      newPharmacist["deputationDivision"] = {
        id: "",
        name: "",
        bn_name: "",
      };
      newPharmacist["deputationDistrict"] = {
        id: "",
        division_id: "",
        name: "",
        bn_name: "",
      };
      newPharmacist["deputationUpazila"] = {
        id: "",
        district_id: "",
        name: "",
        bn_name: "",
      };
      newPharmacist["deputationPlace"] = { name: "", bn_name: "" };
    }
  }

  if (deputationDivision !== undefined) {
    const deputationDivRes = validateDivision(deputationDivision, "Deputation");
    deputationDivRes.valid
      ? (newPharmacist.deputationDivision = deputationDivRes.data)
      : (error.deputationDivision = deputationDivRes.data);
  }

  if (deputationDistrict !== undefined) {
    const deputationDistRes = validateDistrict(
      deputationDistrict,
      "Deputation"
    );
    deputationDistRes.valid
      ? (newPharmacist.deputationDistrict = deputationDistRes.data)
      : (error.deputationDistrict = deputationDistRes.data);
  }

  if (deputationUpazila !== undefined) {
    const deputationUpaRes = validateUpazila(deputationUpazila, "Deputation");
    deputationUpaRes.valid
      ? (newPharmacist.deputationUpazila = deputationUpaRes.data)
      : (error.deputationUpazila = deputationUpaRes.data);
  }

  if (deputationPlace !== undefined) {
    const deputationPlaceRes = validatePlace(deputationPlace, "Deputation");
    deputationPlaceRes.valid
      ? (newPharmacist.deputationPlace = deputationPlaceRes.data)
      : (error.deputationPlace = deputationPlaceRes.data);
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length > 0 ? error : newPharmacist,
  };
};

const getFindOptionsFromQuery = (requestQuery) => {
  const {
    query = "",
    location_type = "all",
    division = "all",
    district = "all",
    upazila = "all",
    job_department_id = "all",
  } = requestQuery;

  const divisionOptions =
    location_type === "currentAddress"
      ? division === "all"
        ? [{}]
        : [{ "postingDivision.id": division }]
      : location_type === "voterArea"
      ? division === "all"
        ? [{}]
        : [{ "voterDivision.id": division }]
      : location_type === "permanentAddress"
      ? division === "all"
        ? [{}]
        : [{ "permanentDivision.id": division }]
      : location_type === "deputationPosting"
      ? division === "all"
        ? [{}]
        : [{ "deputationDivision.id": division }]
      : division === "all"
      ? [{}]
      : [
          { "postingDivision.id": division },
          { "voterDivision.id": division },
          { "permanentDivision.id": division },
          { "deputationDivision.id": division },
        ];

  const districtOptions =
    location_type === "currentAddress"
      ? district === "all"
        ? [{}]
        : [{ "postingDistrict.id": district }]
      : location_type === "voterArea"
      ? district === "all"
        ? [{}]
        : [{ "voterDistrict.id": district }]
      : location_type === "permanentAddress"
      ? district === "all"
        ? [{}]
        : [{ "permanentDistrict.id": district }]
      : location_type === "deputationPosting"
      ? district === "all"
        ? [{}]
        : [{ "deputationDistrict.id": district }]
      : district === "all"
      ? [{}]
      : [
          { "postingDistrict.id": district },
          { "voterDistrict.id": district },
          { "permanentDistrict.id": district },
          { "deputationDistrict.id": district },
        ];

  const upazilaOptions =
    location_type === "currentAddress"
      ? upazila === "all"
        ? [{}]
        : [{ "postingUpazila.id": upazila }]
      : location_type === "permanentAddress"
      ? upazila === "all"
        ? [{}]
        : [{ "permanentUpazila.id": upazila }]
      : location_type === "deputationPosting"
      ? upazila === "all"
        ? [{}]
        : [{ "deputationUpazila.id": upazila }]
      : upazila === "all"
      ? [{}]
      : [
          { "postingUpazila.id": upazila },
          { "permanentUpazila.id": upazila },
          { "deputationUpazila.id": upazila },
        ];

  const searchOptions = {
    $or: [
      { regNumber: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } },
      { bn_name: { $regex: query, $options: "i" } },
      { memberId: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
      { "postingPlace.name": { $regex: query, $options: "i" } },
      { "postingPlace.bn_name": { $regex: query, $options: "i" } },
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
              job_department_id === "all"
                ? {
                    $and: [searchOptions],
                  }
                : {
                    "jobDepartment.id": job_department_id,
                    $and: [searchOptions],
                  },
            ],
          },
        ],
      },
    ],
  };

  return findOptions;
};

module.exports = {
  validateRegNum,
  validatePostPharmacist,
  validateUpdatePharmacist,
  getFindOptionsFromQuery,
};
