const createError = require('../../helpers/createError');
const { Product } = require('../../models/product');
const { Vendor } = require('../../models/vendor');
const Sys = require('../../models/sys');

const addProduct = async (req, res) => {
    const { 
      name,
      price = 0,
      quantity = 0,
      unit = "pcs",
      status = "present",
      category = "unSorted",
      vendor = "000",
      owner
    } = req.body;
 
    const result = await Product.findOne({ name });
    if (result & result?.status !== "deleted") throw createError(409, "The product already exist!");

    const result2 = await Vendor.findOne({ code: vendor });
    if (!result2) throw createError(404, `the vendor ${ vendor } doesn't exist`);

    

    const art = await pad(); // make product code
    
    const data = await Product.create({ name, price, quantity, unit, status, vendor, art, category: category.trim().replace(' ', '').split(','), owner});
    res.status(201).json({
        message: "product added successfully",
        data
    })
}
const pad = async () => {
    const { articul } = await Sys.findByIdAndUpdate( process.env.SYS_ID, { $inc: { articul: 1 } }, { new: true });
    if (articul < 10) return `00000${articul}`;
    if (articul < 100) return `0000${articul}`;
    if (articul < 1000) return `000${articul}`;
    if (articul < 10000) return `00${articul}`;
    if (articul < 100000) return `0${articul}`;
    return `${articul}`;
}
module.exports = addProduct;