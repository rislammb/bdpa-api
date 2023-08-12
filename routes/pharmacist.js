const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const pharmacistController = require('../controllers/pharmacist');

router.get('/:regNumber', pharmacistController.getPharmacistByRegistration);
router.get('/id/:id', pharmacistController.getPharmacistById);
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
router.delete(
  '/id/:id',
  authenticate,
  pharmacistController.deletePharmacistById
);

router.get('/', pharmacistController.getPharmacists);

router.post('/', pharmacistController.postPharmacist);

module.exports = router;
