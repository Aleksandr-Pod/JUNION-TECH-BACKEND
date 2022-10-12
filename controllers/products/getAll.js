const {Product} = require('../../models/product');

const getAllProducts = async (req, res) => {
    const data = await Product.find({});
    res.status(200).json({
        message: `find ${data.length} results`,
        data
    })
} 

module.exports = getAllProducts;