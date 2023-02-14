const router = require('express').Router();
const pharmacistController = require('../controllers/pharmacist');

router.get('/:regNumber', pharmacistController.getPharmacistByRegistration);

router.get('/', pharmacistController.getPharmacists);

router.post('/', pharmacistController.postPharmacist);

module.exports = router;
