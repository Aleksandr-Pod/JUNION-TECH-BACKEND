const { Product } = require('../../models/product');

const getDiscount = async (req, res) => {
    req.query.status = "present";
    const result = await Product.find(req.query.name ?
        { ...req.query, name: { "$regex": req.query.name }, discountPrice: { $gt: 0 } } :
        { ...req.query, discountPrice: { $gt: 0 } });
    res.status(200).json({
        qty: result.length,
        result
    })
}

const putDiscount = async (req, res) => {
    req.query.status = "present";
    const result = await Product.updateMany(req.query, [{ "$set": { discountPrice: { $multiply: ["$price", req.body.discount] } } }], { multi: true });
    res.status(200).json({
        matched: result.matchedCount,
        modified: result.modifiedCount
    })
}

module.exports = {getDiscount, putDiscount}