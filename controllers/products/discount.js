const { Product } = require('../../models/product');

const getDiscount = async (req, res) => {
    const result = req.query.name ?
        await Product.find({ ...req.query, name: { "$regex": req.query.name }, discountPrice: { $gt: 0 } }) :
        await Product.find({ ...req.query, discountPrice: { $gt: 0 } });
    res.status(200).json({
        qty: result.length,
        result
    })
}

const putDiscount = async (req, res) => {
    const result = await Product.updateMany(req.query, [{ "$set": { discountPrice: { $multiply: ["$price", req.body.discount] } } }], {multi: true})
    res.status(200).json({
        message: "put discount",
        result
    })
}

module.exports = {getDiscount, putDiscount}