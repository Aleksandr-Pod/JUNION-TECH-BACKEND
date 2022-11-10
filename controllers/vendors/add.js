const Sys = require('../../models/sys');
const {Vendor} = require('../../models/vendor')

const addVendor = async (req, res) => {
    const {
        name = "someName",
        regCode = Math.floor(Math.random()*89999999+10000000),
        address = "United Kingdom, 23 Freedom str., Z563241",
        owner
    } = req.body;
    const code = await getVendorCounter();
    const data = await Vendor.create({ name, code, regCode, address, owner });
    res.status(201).json({
        message: "vendor created successfully",
        data
    })
}

const getVendorCounter = async () => {
    const {vendorsCount} = await Sys.findByIdAndUpdate(process.env.SYS_ID, { $inc: { vendorsCount: 1 } });
    if (vendorsCount < 10) return `00${vendorsCount}`;
    if (vendorsCount < 100) return `0${vendorsCount}`;
    return `${vendorsCount}`;
} 

module.exports = addVendor;