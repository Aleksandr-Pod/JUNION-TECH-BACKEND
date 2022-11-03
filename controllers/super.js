const createError = require("../helpers/createError");
const Sys = require("../models/sys");
const { User } = require("../models/user");

const getSys = async(req, res) => {
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const result = await Sys.find({}, {_id: 0});
    res.status(200).json({result})
}
const getAllUsers = async (req, res) => {
    console.log("getAllUsers: role - ", req.user.role);
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const result = await User.find({}, {password: 0, token: 0});
    res.status(200).json({
        quantity: result.length,
        result
    })
}
const putSuperPass = async (req, res) => {
    console.log("putSuoerPass: role - ", req.user.role);
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const { superPass, role } = req.body;
    await Sys.findByIdAndUpdate(process.env.SYS_ID, { superPass, role }, { new: true });
    res.status(200).json({
        access: {superPass, role}
    })
}
module.exports = { getSys, getAllUsers, putSuperPass };