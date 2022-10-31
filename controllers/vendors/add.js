const createError = require('../../helpers/createError');
const {Vendor} = require('../../models/vendor')

const addVendor = async (req, res) => {
    const {
        name = "someName",
        code = "000",
        regCode = genRegCode(),
        address = "United Kingdom, 23 Freedom str., Z563241",
        owner
    } = req.body;
    const result = await Vendor.findOne({ regCode });
    if (result) throw createError(409, "The vendor code already exist!")
    const data = await Vendor.create({ name, code, regCode, address, owner });
    res.status(201).json({
        message: "vendor created successfull",
        data
    })
}
const genRegCode = () => (`${Math.floor(Math.random() * 90000000 + 10000000)}`).toString();

module.exports = addVendor;