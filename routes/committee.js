const router = require('express').Router();
const committeeControllers = require('../controllers/committee');
const authenticate = require('../middleware/authenticate');

router.get('/:committeePath', committeeControllers.getCommitteeByPath);
router.patch(
  '/:committeePath',
  authenticate,
  committeeControllers.patchCommitteeByPath
);
router.put(
  '/:committeePath',
  authenticate,
  committeeControllers.putCommitteeByPath
);
router.delete(
  '/:committeePath',
  authenticate,
  committeeControllers.deleteCommitteeByPath
);
router.get('/', committeeControllers.getCommittees);
router.post('/', authenticate, committeeControllers.postCommittee);

module.exports = router;
