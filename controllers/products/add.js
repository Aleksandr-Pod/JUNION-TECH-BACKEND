const createError = require('../../helpers/createError');
const {Product} = require('../../models/product');

const addProduct = async(req, res) => {
    const {name, price = 0, quantity = 0, category = "unSorted", owner} = req.body;
    const result = await Product.findOne({name});
    if (result) throw createError(409, "The product already exist!");
    await Product.create({name, price, quantity, category: category.replace(' ').split(','), owner});
    res.status(201).json({
        message: "product added successfull",
        data: {name, price, quantity, category, owner}
    })
}

module.exports = addProduct;