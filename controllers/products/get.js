const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    const result = await Product.find(req.query.name ?
        { ...req.query, name: { "$regex": req.query.name } } :
        req.query);
    res.status(200).json({
        qty: result.length,
        result
    })
} 

module.exports = getProducts;