const {Product} = require('../../models/product');

const addProduct = async(req, res) => {
    const {name, price = 0, category = "unSorted", owner} = req.body;
    await Product.create({name, price, category, owner});
    res.status(201).json({
        message: "product added successfull",
        data: {name, price, category, owner}
    })
}

module.exports = addProduct;