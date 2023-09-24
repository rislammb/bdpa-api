const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const pharmacistRoutes = require('./pharmacist');
const committeeRoutes = require('./committee');
const memberRoutes = require('./member');

const authenticate = require('../middleware/authenticate');

router.use('/auth', authRoutes);
router.use('/user', authenticate, userRoutes);
router.use('/pharmacist', pharmacistRoutes);
router.use('/committee', committeeRoutes);
router.use('/member', memberRoutes);

module.exports = router;
