const createError = require('../../helpers/createError');
// const Joi = require('joi');
const {Product} = require('../../models/product');

const updateProduct = async(req, res) => {
    const {id, name, price, category, owner} = req.body;
    if (!name && !price && !category) throw createError (400, 'no fields to update');
    const result = await Product.findByIdAndUpdate(id, {name, price, category, owner})
    if (!result) throw createError(404);
    res.status(200).json({
        message: 'updated successfull'
    })
}

module.exports = updateProduct;