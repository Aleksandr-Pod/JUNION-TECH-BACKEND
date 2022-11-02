const createError = require('../../helpers/createError');
const { Vendor } = require('../../models/vendor');

const updateVendor = async (req, res) => {
    const { id, name, regCode, code, address, owner } = req.body;
    if (!name && !regCode && !code && !address) throw createError(400, 'no fields to update');
    const result = await Vendor.findByIdAndUpdate( id, {name, regCode, code, address, owner}, {new:true});
    if (!result) throw createError(404);
    res.status(200).json({
        message: `vendor updated successfully`,
        newData: result
    })
}

module.exports = updateVendor;