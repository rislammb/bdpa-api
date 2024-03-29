const validatePassword = (password, confirmPassword) => {
  const error = {};
  let response = '';

  if (typeof password !== 'string' || password.length < 7) {
    error.password = {
      text: 'Password type must be string and minimum 7 characters long!',
      bn_text: 'পাসওয়ার্ড টাইপ স্ট্রিং এবং ন্যূনতম ৭ অক্ষর দীর্ঘ হতে হবে!',
    };
  } else if (
    !password.match(/\d/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[a-z]/g)
  ) {
    error.password = {
      text: 'Password must contain at least 1 lowercase letter, uppercase letter, and number!',
      bn_text:
        'পাসওয়ার্ডে কমপক্ষে ১ টি করে ছোটহাতের অক্ষর, বড় হাতের অক্ষর ও সংখ্যা থাকতে হবে!',
    };
  } else {
    if (confirmPassword !== undefined && password !== confirmPassword) {
      error.confirmPassword = {
        text: 'Password and confirm password does not match!',
        bn_text: 'পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না!',
      };
    } else {
      response = password;
    }
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length < 1 ? response : error,
  };
};

const getPopulatedUser = (user) => {
  return (
    user && {
      _id: user._id,
      email: user.email,
      regNumber: user.regNumber,
      imageUrl: user.pharmacistId?.imageUrl,
      name: user.pharmacistId?.name,
      bn_name: user.pharmacistId?.bn_name,
      roles: user.roles,
      accountStatus: user.accountStatus,
      adminDetails: user.adminDetails,
    }
  );
};

module.exports = { validatePassword, getPopulatedUser };
