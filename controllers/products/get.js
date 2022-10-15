const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    console.log("Queries:", req.query);
    const data = await Product.find(req.query);
    res.status(200).json({
        quantity: data.length,
        data
    })
} 

module.exports = getProducts;