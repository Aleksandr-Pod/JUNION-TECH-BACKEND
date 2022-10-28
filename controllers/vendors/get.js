const createError = require('../../helpers/createError');
const { Vendor } = require('../../models/vendor');

const getVendors = async (req, res) => {
    const data = await Vendor.find();
    if (!data) throw createError(404, "No any vendor in database");
    console.log('Vendor:', data)
    res.status(200).json({
        quantity: data.length,
        data
    })
}

module.exports = getVendors;