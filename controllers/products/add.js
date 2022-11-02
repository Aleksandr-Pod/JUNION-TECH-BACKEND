const createError = require('../../helpers/createError');
const { Product } = require('../../models/product');
const { Vendor } = require('../../models/vendor');
const Sys = require('../../models/sys');

const addProduct = async (req, res) => {
    const { name, price = 0, quantity = 0, vendor = "000", category = "unSorted", owner } = req.body;
    const result = await Product.findOne({ name });
    if (result) throw createError(409, "The product already exist!");
    const result2 = await Vendor.findOne({ code: vendor });
    if (!result2) throw createError(404, `the vendor ${vendor} doesn't exist`);
    const { articul } = await Sys.findOneAndUpdate({ _id: "63623a50a18c124d0c56eb31" }, { $inc: { articul: 1 }});
    const art = pad(articul); // код товара
    const data = await Product.create({name, price, quantity, vendor, art, category: category.trim().replace(' ', '').split(','), owner});
    res.status(201).json({
        message: "product added successfully",
        data
    })
}
const pad = (num) => {
    if (num < 10) return `00000${num + 1}`;
    if (num < 100) return `0000${num + 1}`;
    if (num < 1000) return `000${num + 1}`;
    if (num < 10000) return `00${num + 1}`;
    if (num < 100000) return `0${num + 1}`;
    return `${num + 1}`;
}
module.exports = addProduct;