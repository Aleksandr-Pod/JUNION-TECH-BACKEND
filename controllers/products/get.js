const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    let data;
    if (req.query.name) { data = await Product.find({ ...req.query, name: { "$regex": req.query.name } }) }
    else { data = await Product.find(req.query) }
    res.status(200).json({
        quantity: data.length,
        data
    })
} 

module.exports = getProducts;