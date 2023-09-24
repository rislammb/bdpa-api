const router = require('express').Router();
const memberController = require('../controllers/member');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, memberController.postMember);
router.get('/', memberController.getMembers);

module.exports = router;
