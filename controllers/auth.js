const { registerService, loginService } = require('../services/auth');
const { findPharmacistByProperty } = require('../services/pharmacist');

const registerController = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ text: 'Invalid data!', bn_text: 'অকার্যকর তথ্য!' });
  }

  try {
    const pharmacist = await findPharmacistByProperty('email', email);

    if (!pharmacist) {
      return res.status(400).json({
        email: {
          text: 'This email is not found in pharmacist database!',
          bn_text: 'ডাটাবেজে এই ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!',
        },
      });
    }

    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        password: {
          text: 'Password must be string and minimum 6 characters long!',
          bn_text: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর লম্বা স্ট্রিং হবে',
        },
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        confirmPassword: {
          text: 'Password and confirm password not match!',
          bn_text: 'পাসওয়ার্ড ও নিশ্চিত করা পাসওয়ার্ড মিল হয় নি!',
        },
      });
    }

    const user = await registerService({
      email,
      password,
      regNumber: pharmacist.regNumber,
      pharmacistId: pharmacist._id,
    });

    res.status(201).json({
      text: 'User created successfully.',
      bn_text: 'ইউজার সঠিকভাবে তৈরি হয়েছে।',
    });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });

    return res
      .status(200)
      .json({ text: 'Login successfull.', bn_text: 'লগ ইন হয়েছে।', token });
  } catch (e) {
    next(e);
  }
};

const verfiyToken = (req, res, next) => {
  if (req.user) return res.status(200).json(req.user);
  else
    res
      .status(404)
      .json({ text: 'User not found!', bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!' });
};

module.exports = { registerController, loginController, verfiyToken };
