const {vendors} = require('../controllers')
const { auth, ctrlWrapper, validation } = require('../middlewares');
const { joiAddProductSchema, joiUpdateProductSchema } = require('../models/product');

const router = require('express').Router();

router.get('/', auth, ctrlWrapper(vendors.getVendors));
router.post('/', auth, validation(joiAddProductSchema), ctrlWrapper(vendors.addVendor));
router.delete('/', auth, ctrlWrapper(vendors.deleteVendor));
router.put('/', auth, validation(joiUpdateProductSchema), ctrlWrapper(vendors.updateVendor));

module.exports = router;
