const createError = require('../../helpers/createError');
const { Product } = require('../../models/product');
const { Vendor } = require('../../models/vendor');

const addProduct = async(req, res) => {
    const {name, price = 0, quantity = 0, vendor = "000", category = "unSorted", owner} = req.body;
    const result = await Product.findOne({ name });
    if (result) throw createError(409, "The product already exist!");
    const result2 = await Vendor.findOne({ code: vendor });
    if (!result2) throw createError(404, `the vendor ${vendor} doesn't exist`);
    const { itemsCounter } = result2;
    await Vendor.findOneAndUpdate({code: vendor}, {itemsCounter: itemsCounter+1})
    const art = pad(itemsCounter); // код товара
    await Product.create({name, price, quantity, vendor, art, category: category.trim().replace(' ', '').split(','), owner});
    res.status(201).json({
        message: "product added successfull",
        data: {name, price, quantity, vendor, art, category, owner}
    })
}
const pad = (num) => {
    if (num < 10) return `000${num + 1}`;
    if (num < 100) return `00${num + 1}`;
    if (num < 1000) return `0${num + 1}`;
    return `${num + 1}`;
}
module.exports = addProduct;