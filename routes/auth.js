const router = require('express').Router();
const authControllers = require('../controllers/auth');
const authenticate = require('../middleware/authenticate');

/**
 * User registration
 * @method POST
 */
router.post('/register', authControllers.registerController);

/**
 * Resend email to user for verification email
 * @method POST
 */
router.post('/resend-email', authControllers.resendVerificationEmail);

/**
 * Set password for verified user
 * @method POST
 */
router.post('/set-password', authControllers.setPassword);

/**
 * Verify user email
 * @method POST
 */
router.post('/verify-email', authControllers.verifyEmail);

/**
 * User login
 * @method POST
 */
router.post('/login', authControllers.loginController);

/**
 * Verify token from authorization headers
 * @method GET
 */
router.get('/verify-token', authenticate, authControllers.verfiyToken);

module.exports = router;
