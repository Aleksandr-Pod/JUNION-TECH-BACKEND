const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    const result = req.query.name ?
        await Product.find({ ...req.query, name: { "$regex": req.query.name } }) :
        await Product.find(req.query);
    res.status(200).json({
        qty: result.length,
        result
    })
} 

module.exports = getProducts;