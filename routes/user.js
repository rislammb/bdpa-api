const router = require('express').Router();
const userController = require('../controllers/user');

/**
 * Get user by id
 * @method GET
 */
router.get('/:userId', userController.getUserById);

/**
 * Update user by id
 * @method PUT
 */
router.put('/:userId', userController.putUserById);

/**
 * Update user by id
 * @method PATCH
 */
router.patch('/:userId', userController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 */
router.delete('/:userId', userController.deleteUserById);

/**
 * Get all users
 * @method GET
 */
router.get('/', userController.getUsers);

/**
 * Create new user
 * @method POST
 */
router.post('/', userController.postUser);

module.exports = router;
