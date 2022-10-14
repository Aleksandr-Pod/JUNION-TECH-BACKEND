const {Product} = require('../../models/product');

const getAllProducts = async (req, res) => {
    const data = await Product.find({});
    res.status(200).json({
        quantity: data.length,
        data
    })
} 

module.exports = getAllProducts;