const { Vendor } = require("../../models/vendor");
const createError = require("../../helpers/createError");

const deleteVendor = async (req, res) => {
    const { id } = req.body;
    if (!id) throw createError(400, 'id is required');
    const result = await Vendor.findByIdAndRemove(id);
    console.log("delete result:", result);
    res.status(200).json({
        message: `vemdor id=${id} deleted successfull`
    })
}

module.exports = deleteVendor;