const router = require('express').Router();
const committeeControllers = require('../controllers/committee');

router.get('/:committeePath', committeeControllers.getCommitteeByPath);
router.patch('/:committeePath', committeeControllers.patchCommitteeByPath);
router.put('/:committeePath', committeeControllers.putCommitteeByPath);
router.delete('/:committeePath', committeeControllers.deleteCommitteeByPath);
router.get('/', committeeControllers.getCommittees);
router.post('/', committeeControllers.postCommittee);

module.exports = router;
