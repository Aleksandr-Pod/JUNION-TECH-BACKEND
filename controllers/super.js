const createError = require("../helpers/createError");
const Sys = require("../models/sys");
const { User } = require("../models/user");

const getSys = async(req, res) => {
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const result = await Sys.findOne({}, {_id: 0});
    res.status(200).json({result})
}
const putSuperPass = async (req, res) => {
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const { superPass, role } = req.body;
    if (!superPass && !role) createError(400, 'no fields to update')
    await Sys.findByIdAndUpdate(process.env.SYS_ID, { superPass, role }, { new: true });
    res.status(200).json({
        superPass,
        role
    })
}
const getAllUsers = async (req, res) => {
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const result = await User.find({}, {password: 0, token: 0});
    res.status(200).json({
        quantity: result.length,
        result
    })
}
const updateUserRole = async (req, res) => {
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const { role, id } = req.body;
    if (!role || !id) throw createError(400, "user's role and id required");
    const result = await User.findByIdAndUpdate(id, { role });
    if (!result) throw createError(404);
    res.status(200).json({
        message: "the user's role updated successfully"
    })
}
const deleteUser = async (req, res) => {
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    if (!req.body.id) createError(400, "user id required");
    const result = await User.findByIdAndRemove(req.body.id);
    if (!result) throw createError(404);
    res.status(200).json({
        message: `user deleted successfully`
    })
}
module.exports = { getSys, putSuperPass, getAllUsers, updateUserRole, deleteUser};