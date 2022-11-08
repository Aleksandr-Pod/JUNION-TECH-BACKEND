const {Product} = require("../../models/product");

const getCategories = async(req, res) => {
    const data = await Product.distinct("category");
    res.status(200).json({
        quantity: data.length,
        data
    });
}
module.exports = getCategories;