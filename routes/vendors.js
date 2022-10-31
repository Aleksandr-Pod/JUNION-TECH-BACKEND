const {vendors} = require('../controllers')
const { auth, ctrlWrapper, validation } = require('../middlewares');
const { joiAddVendorSchema, joiUpdateVendorSchema } = require('../models/vendor');

const router = require('express').Router();

router.get('/', auth, ctrlWrapper(vendors.getVendors));
router.post('/', auth, validation(joiAddVendorSchema), ctrlWrapper(vendors.addVendor));
router.delete('/', auth, ctrlWrapper(vendors.deleteVendor));
router.put('/', auth, validation(joiUpdateVendorSchema), ctrlWrapper(vendors.updateVendor));

module.exports = router;
