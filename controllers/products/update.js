const createError = require('../../helpers/createError');
const {Product} = require('../../models/product');

const updateProduct = async(req, res) => {
    const { id, name, price, quantity, category, vendor, owner } = req.body;
    if (!name && !price && !quantity && !category && !vendor) throw createError(400, 'no fields to update');
    // Если изменяем поставщика, нужно поменять артикул !!!
    const result = await Product.findByIdAndUpdate(id, {name, price, quantity, category: category?.replace(" ").split(','), vendor, owner}, {new:true});
    if (!result) throw createError(404);
    res.status(200).json({
        message: 'updated successfully',
        newData: result
    })
}

module.exports = updateProduct;