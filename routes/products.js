const {products} = require('../controllers')
const { auth, ctrlWrapper, validation } = require('../middlewares');
const { joiAddProductSchema, joiUpdateProductSchema } = require('../models/product');

const router = require('express').Router();

router.get('/', auth, ctrlWrapper(products.getProducts));
router.post('/', auth, validation(joiAddProductSchema), ctrlWrapper(products.addProduct));
router.put('/', auth, validation(joiUpdateProductSchema), ctrlWrapper(products.updateProduct));

router.get('/today', auth, ctrlWrapper(products.getTodayProducts));

router.get('/discount', auth, ctrlWrapper(products.getDiscount));
router.put('/discount', auth, ctrlWrapper(products.putDiscount));

module.exports = router;