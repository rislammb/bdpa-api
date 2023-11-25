const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth');
const userService = require('../services/user');
const pharmacistService = require('../services/pharmacist');
const { sendEmail, getMessage } = require('../utils/email');
const { validatePassword } = require('../utils/user');

const registerController = async (req, res, next) => {
  const { email, clientUrl } = req.body;

  if (!email || !clientUrl) {
    return res
      .status(400)
      .json({ text: 'Invalid data!', bn_text: 'অকার্যকর তথ্য!' });
  }

  try {
    let user = await userService.findUserByProperty('email', email);

    if (user) {
      if (user.isVerified) {
        if (user.password) {
          return res.status(400).json({
            email: {
              text: 'This user already exists!',
              bn_text: 'এই ইউজার ইতোমধ্যেই আছে!',
            },
          });
        } else {
          return res.status(400).json({
            email: {
              text: "This user's password is not set!",
              bn_text: 'এই ব্যবহারকারীর পাসওয়ার্ড সেট করা নেই!',
            },
            passwordNotSet: true,
          });
        }
      } else {
        return res.status(400).json({
          email: {
            text: 'A verification email has already been sent to this user!',
            bn_text: 'এই ইউজারকে ইতিমধ্যেই একটি যাচাইকরণ ইমেইল পাঠানো হয়েছে!',
          },
          alreadySendEmail: true,
        });
      }
    } else {
      const pharmacist = await pharmacistService.findPharmacistByProperty(
        'email',
        email
      );

      if (!pharmacist) {
        return res.status(404).json({
          email: {
            text: 'This email is not found in pharmacist database!',
            bn_text: 'ডাটাবেজে এই ফার্মাসিস্ট পাওয়া যায় নি!',
          },
        });
      }

      user = await authService.register({
        email,
        regNumber: pharmacist.regNumber,
        pharmacistId: pharmacist._id,
      });

      const { subject, html } = getMessage(user, clientUrl);

      const message = {
        from: `BDPA Email Verification <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject,
        html,
      };

      await sendEmail(message);

      return res.status(201).json({
        text: 'A verification email has been sent to you.',
        bn_text: 'আপনাকে একটি যাচাইকরণ ইমেইল পাঠানো হয়েছে।',
      });
    }
  } catch (e) {
    next(e);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  const { email, clientUrl } = req.body;

  if (!email || !clientUrl) {
    return res
      .status(400)
      .json({ text: 'Invalid data!', bn_text: 'অকার্যকর তথ্য!' });
  }

  try {
    let user = await userService.findUserByProperty('email', email);

    if (!user) {
      return res.status(404).json({
        email: {
          text: 'This email is not found in user database!',
          bn_text: 'ডাটাবেজে এই ইউজার পাওয়া যায় নি!',
        },
      });
    }

    if (user) {
      if (user.isVerified && !user.emailToken) {
        if (user.password) {
          return res.status(400).json({
            email: {
              text: 'This user already exists!',
              bn_text: 'এই ইউজার ইতোমধ্যেই আছে!',
            },
          });
        } else {
          return res.status(400).json({
            email: {
              text: "This user's password is not set!",
              bn_text: 'এই ব্যবহারকারীর পাসওয়ার্ড সেট করা নেই!',
            },
            passwordNotSet: true,
          });
        }
      } else {
        const { subject, html } = getMessage(user, clientUrl);

        const message = {
          from: `BDPA Email Verification <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject,
          html,
        };

        await sendEmail(message);

        return res.status(201).json({
          text: 'A verification email has been sent to you.',
          bn_text: 'আপনাকে একটি যাচাইকরণ ইমেইল পাঠানো হয়েছে।',
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

const verifyEmail = async (req, res, next) => {
  const { emailToken } = req.body;

  if (!emailToken) {
    return res.status(404).json({
      text: 'Email token not found!',
      bn_text: 'ইমেইল টোকেন পাওয়া যায় নি!',
    });
  }

  try {
    const user = await userService.findUserByProperty('emailToken', emailToken);

    if (!user) {
      return res.status(400).json({
        text: 'The email token is not valid!',
        bn_text: 'ইমেইল টোকেন সঠিক নয়!',
      });
    }

    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      text: 'Email verified successfully.',
      bn_text: 'ইমেইল সঠিকভাবে যাচাই করা হয়েছে।',
      email: user.email,
    });
  } catch (e) {
    next(e);
  }
};

/**
 *
 */
const setPassword = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ text: 'Invalid data!', bn_text: 'অকার্যকর তথ্য!' });
  } else {
    const { valid, data } = validatePassword(password, confirmPassword);

    if (!valid) {
      return res.status(400).json(data);
    } else {
      try {
        const user = await userService.findUserByProperty('email', email);

        if (!user) {
          return res.status(404).json({
            text: 'User not found!',
            bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!',
          });
        }

        if (!user.isVerified) {
          return res.status(400).json({
            text: 'The email has not been verified!',
            bn_text: 'ইমেইল যাচাই করা হয়নি!',
          });
        } else if (user.password) {
          return res.status(400).json({
            text: 'The password is set!',
            bn_text: 'পাসওয়ার্ড সেট করা আছে!',
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(data, salt);

          user.password = hash;
          user.accountStatus = 'ACTIVE';

          await user.save();

          const payload = {
            _id: user._id,
            email: user.email,
            regNumber: user.regNumber,
            pharmacistId: user.pharmacistId,
            roles: user.roles,
            accountStatus: user.accountStatus,
            adminDetails: user.adminDetails,
          };

          const token = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '7d',
          });

          return res.status(200).json({ token });
        }
      } catch (e) {
        next(e);
      }
    }
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ text: 'Invalid data!', bn_text: 'অকার্যকর তথ্য!' });
  }

  try {
    const token = await authService.login({ email, password });

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
    return res
      .status(404)
      .json({ text: 'User not found!', bn_text: 'ইউজার খুঁজে পাওয়া যায় নি!' });
};

module.exports = {
  registerController,
  resendVerificationEmail,
  verifyEmail,
  setPassword,
  loginController,
  verfiyToken,
};
