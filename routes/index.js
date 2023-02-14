const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const pharmacistRoutes = require('./pharmacist');

const authenticate = require('../middleware/authenticate');

router.use('/auth', authRoutes);
router.use('/user', authenticate, userRoutes);
router.use('/pharmacist', pharmacistRoutes);

module.exports = router;
