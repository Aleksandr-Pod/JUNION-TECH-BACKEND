const {products} = require('../controllers')
const { auth, ctrlWrapper, validation } = require('../middlewares');
const { joiAddProductSchema, joiUpdateProductSchema } = require('../models/product');

const router = require('express').Router();

router.get('/', auth, ctrlWrapper(products.getProducts));
router.post('/', auth, validation(joiAddProductSchema), ctrlWrapper(products.addProduct));
router.delete('/', auth, ctrlWrapper(products.deleteProduct));
router.put('/', auth, validation(joiUpdateProductSchema), ctrlWrapper(products.updateProduct));
router.get('/today', auth, ctrlWrapper(products.getTodayProducts));

module.exports = router;