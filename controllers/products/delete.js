const createError = require('../../helpers/createError');
const {Product} = require('../../models/product');

const deleteProduct = async(req, res) => {
    const {id} = req.body;
    const result = await Product.findByIdAndRemove(id);
    if (!result) throw createError(404);
    res.status(200).json({
        message: `product id=${id} deleted successfull`
    })
}

module.exports = deleteProduct;