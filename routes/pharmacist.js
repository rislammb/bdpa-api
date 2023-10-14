const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const pharmacistController = require('../controllers/pharmacist');

/**
 * Get pharmacist by registration number
 * @method GET
 */
router.get('/reg/:regNumber', pharmacistController.getPharmacistByRegistration);

/**
 * Get pharmacist by id
 * @method GET
 */
router.get('/id/:id', pharmacistController.getPharmacistById);

/**
 * Update pharmacist by registration number
 * @method PUT
 */
router.put(
  '/reg/:regNumber',
  authenticate,
  pharmacistController.putPharmacistByRegistration
);

/**
 * Update pharmacist by registration number
 * @method PATCH
 */
router.patch(
  '/reg/:regNumber',
  authenticate,
  pharmacistController.patchPharmacistByRegistration
);

/**
 * Delete pharmacist by registration number
 * @method DELETE
 */
router.delete(
  '/reg/:regNumber',
  authenticate,
  pharmacistController.deletePharmacistByRegistration
);

/**
 * Delete pharmacist by id
 * @method DELETE
 */
router.delete(
  '/id/:id',
  authenticate,
  pharmacistController.deletePharmacistById
);

/**
 * Get all pharmacists with details information
 * @method GET
 */
router.get(
  '/details',
  authenticate,
  pharmacistController.getDetailsPharmacists
);

/**
 * Get all pharmacists
 * @method GET
 */
router.get('/', pharmacistController.getPharmacists);

/**
 * Create new pharmacist
 * @method POST
 */
router.post('/', authenticate, pharmacistController.postPharmacist);

module.exports = router;
