const router = require('express').Router();
const committeeControllers = require('../controllers/committee');
const authenticate = require('../middleware/authenticate');
const adminAuthorize = require('../middleware/adminAuthorize');

/**
 * Get committee with member details by committee path
 * @method GET
 */
router.get('/:committeePath', committeeControllers.getCommitteeByPath);

/**
 * Get committee with member details by committee id
 * @method GET
 */
router.get('/id/:committeeId', committeeControllers.getCommitteeById);

/**
 * Update committee information by committee path
 * @method PATCH
 */
router.patch(
  '/:committeePath',
  authenticate,
  adminAuthorize,
  committeeControllers.patchCommitteeByPath
);

/**
 * Update committee information by committee path
 * @method PUT
 */
router.put(
  '/:committeePath',
  authenticate,
  adminAuthorize,
  committeeControllers.putCommitteeByPath
);

/**
 * Delete committee with members by committee path
 * @method DELETE
 */
router.delete(
  '/:committeePath',
  authenticate,
  adminAuthorize,
  committeeControllers.deleteCommitteeByPath
);

/**
 * Get all committees with member details
 * @method GET
 */
router.get('/', committeeControllers.getCommittees);

/**
 * Create new committee
 * @method POST
 */
router.post(
  '/',
  authenticate,
  adminAuthorize,
  committeeControllers.postCommittee
);

module.exports = router;
