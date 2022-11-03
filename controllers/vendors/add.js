const createError = require('../../helpers/createError');
const Sys = require('../../models/sys');
const {Vendor} = require('../../models/vendor')

const addVendor = async (req, res) => {
    const {
        name = "someName",
        code = await getVendorCounter(),
        regCode = "00000000",
        address = "United Kingdom, 23 Freedom str., Z563241",
        owner
    } = req.body;        
    const result = await Vendor.findOne({ code });
    if (result) throw createError(409, `The vendor code ${code} already exist!`)
    const data = await Vendor.create({ name, code, regCode, address, owner });
    res.status(201).json({
        message: "vendor created successfully",
        data
    })
}
const getVendorCounter = async () => {
    const {V} = await Sys.findOneAndUpdate({ _id: "63623a50a18c124d0c56eb31" }, { $inc: { V: 1 } });
    if (V < 10) return `00${V}`;
    if (V < 100) return `0${V}`;
    return `${V}`;
} 

module.exports = addVendor;