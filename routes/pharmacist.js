const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const pharmacistController = require('../controllers/pharmacist');
const adminAuthorize = require('../middleware/adminAuthorize');
const authorize = require('../middleware/authorize');
const userAuthorize = require('../middleware/userAuthorize');

/**
 * Get pharmacist by registration number
 * @method GET
 */
router.get(
  '/reg/:regNumber',
  authorize,
  pharmacistController.getPharmacistByRegistration
);

/**
 * Get pharmacist by id
 * @method GET
 */
router.get('/id/:id', authorize, pharmacistController.getPharmacistById);

/**
 * Update pharmacist by registration number
 * @method PUT
 */
router.put(
  '/reg/:regNumber',
  authenticate,
  adminAuthorize,
  pharmacistController.putPharmacistByRegistration
);

/**
 * Update pharmacist by registration number
 * @method PATCH
 */
router.patch(
  '/reg/:regNumber',
  authenticate,
  userAuthorize,
  pharmacistController.patchPharmacistByRegistration
);

/**
 * Delete pharmacist by registration number
 * @method DELETE
 */
router.delete(
  '/reg/:regNumber',
  authenticate,
  adminAuthorize,
  pharmacistController.deletePharmacistByRegistration
);

/**
 * Delete pharmacist by id
 * @method DELETE
 */
router.delete(
  '/id/:id',
  authenticate,
  adminAuthorize,
  pharmacistController.deletePharmacistById
);

/**
 * Get all pharmacists with details information
 * @method GET
 */
router.get(
  '/details',
  authenticate,
  adminAuthorize,
  pharmacistController.getDetailsPharmacists
);

/**
 * Get all pharmacists
 * @method GET
 */
router.get('/', authorize, pharmacistController.getPharmacists);

/**
 * Create new pharmacist
 * @method POST
 */
router.post(
  '/',
  authenticate,
  adminAuthorize,
  pharmacistController.postPharmacist
);

module.exports = router;
