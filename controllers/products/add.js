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
    console.log(result)
    
    if (result & result?.status !== "deleted") throw createError(409, "The product already exist!");

    const result2 = await Vendor.findOne({ code: vendor });
    if (!result2) throw createError(404, `the vendor ${vendor} doesn't exist`);

    const { articul } = await Sys.findByIdAndUpdate(process.env.SYS_ID, { $inc: { articul: 1 }});

    const art = pad(articul); // make product code
    const data = await Product.create({name, price, quantity, unit, status, vendor, art, category: category.trim().replace(' ', '').split(','), owner});
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