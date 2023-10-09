const router = require('express').Router();
const authControllers = require('../controllers/auth');
const authenticate = require('../middleware/authenticate');

/**
 * User registration
 * @method POST
 */
router.post('/register', authControllers.registerController);

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
