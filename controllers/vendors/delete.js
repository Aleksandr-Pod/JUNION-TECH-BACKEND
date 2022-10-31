const { Vendor } = require("../../models/vendor");
const createError = require("../../helpers/createError");

const deleteVendor = async (req, res) => {
    const { id } = req.body;
    if (!id) throw createError(400, 'id is required');
    const result = await Vendor.findByIdAndRemove(id);
    if (!result) throw createError(404);
    res.status(200).json({
        message: `vendor id=${id} deleted successfully`
    })
}

module.exports = deleteVendor;