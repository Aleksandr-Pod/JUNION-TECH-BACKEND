const {vendors} = require('../controllers')
const { auth, ctrlWrapper } = require('../middlewares');

const router = require('express').Router();

router.get('/', auth, ctrlWrapper(vendors.getVendors));
router.post('/', auth, ctrlWrapper(vendors.addVendor));

module.exports = router;
