const router = require('express').Router();
const memberController = require('../controllers/member');
const authenticate = require('../middleware/authenticate');

/**
 * Get all committee members by committee id
 * @method GET
 */
router.get('/c/:committeeId', memberController.getMembersByCommitteeId);

/**
 * Get member by member id
 * @method GET
 */
router.get('/m/:memberId', memberController.getMemberById);

/**
 * Update member by member id
 * @method PATCH
 */
router.patch('/m/:memberId', authenticate, memberController.patchMemberById);

/**
 * Delete member by committee id
 * @method DELETE
 */
router.delete(
  '/c/:committeeId',
  authenticate,
  memberController.deleteMembersByCommitteeId
);

/**
 * Delete member by member id
 * @method DELETE
 */
router.delete('/m/:memberId', authenticate, memberController.deleteMemberById);

/**
 * Get all members
 * @method GET
 */
router.get('/', memberController.getMembers);

/**
 * Create new member
 * @method POST
 */
router.post('/', authenticate, memberController.postMember);

module.exports = router;
