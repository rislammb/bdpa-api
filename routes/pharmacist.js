const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const pharmacistController = require('../controllers/pharmacist');

router.get('/:regNumber', pharmacistController.getPharmacistByRegistration);
router.put(
  '/:regNumber',
  authenticate,
  pharmacistController.putPharmacistByRegistration
);
router.patch(
  '/:regNumber',
  authenticate,
  pharmacistController.patchPharmacistByRegistration
);
router.delete(
  '/:regNumber',
  authenticate,
  pharmacistController.deletePharmacistByRegistration
);

router.get('/', pharmacistController.getPharmacists);

router.post('/', pharmacistController.postPharmacist);

module.exports = router;
