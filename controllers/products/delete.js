const createError = require('../../helpers/createError');
const {Product} = require('../../models/product');

const deleteProduct = async(req, res) => {
    const { id } = req.body;
    if (!id) throw createError(400, 'id is required');
    const result = await Product.findByIdAndRemove(id);
    if (!result) throw createError(404);
    res.json({
        message: `product id=${id} deleted successfully`
    })
}

module.exports = deleteProduct;