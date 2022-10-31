const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    let data;
    console.log(req.query)
    if (req.query) data = await Product.find({ ...req.query, name: { "$regex": req.query.name } });
    if (!req.query) data = await Product.find();
    res.status(200).json({
        quantity: data.length,
        data
    })
} 

module.exports = getProducts;