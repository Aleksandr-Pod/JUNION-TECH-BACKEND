const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    const data = await Product.find({ ...req.query, name: { "$regex": req.query.name } });
    res.status(200).json({
        quantity: data.length,
        data
    })
} 

module.exports = getProducts;