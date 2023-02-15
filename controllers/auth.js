const { registerService, loginService } = require('../services/auth');
const { findPharmacistByProperty } = require('../services/pharmacist');

const registerController = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Invalid data!' });
  }

  try {
    const pharmacist = await findPharmacistByProperty('email', email);

    if (!pharmacist) {
      return res
        .status(400)
        .json({ message: 'This email is not found in pharmacist database!' });
    }

    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        message: 'Password must be string and minimum 6 characters long!',
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Password and confirm password not match!' });
    }

    const user = await registerService({
      email,
      password,
      regNumber: pharmacist.regNumber,
      pharmacistId: pharmacist._id,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });

    return res.status(200).json({ message: 'Login successfull', token });
  } catch (e) {
    next(e);
  }
};

module.exports = { registerController, loginController };
