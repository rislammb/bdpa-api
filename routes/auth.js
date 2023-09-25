const router = require('express').Router();
const { registerController, loginController } = require('../controllers/auth');

/**
 * User registration
 * @method POST
 */
router.post('/register', registerController);

/**
 * User login
 * @method POST
 */
router.post('/login', loginController);

module.exports = router;
