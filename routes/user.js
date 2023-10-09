const router = require('express').Router();
const userController = require('../controllers/user');
const authenticate = require('../middleware/authenticate');
/**
 * Get user by id
 * @method GET
 */
router.get('/:userId', authenticate, userController.getUserById);

/**
 * Update user by id
 * @method PUT
 */
router.put('/:userId', authenticate, userController.putUserById);

/**
 * Update user by id
 * @method PATCH
 */
router.patch('/:userId', authenticate, userController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 */
router.delete('/:userId', authenticate, userController.deleteUserById);

/**
 * Get all users
 * @method GET
 */
router.get('/', authenticate, userController.getUsers);

/**
 * Create new user
 * @method POST
 */
router.post('/', authenticate, userController.postUser);

module.exports = router;
