const createError = require("../helpers/createError");
const { User } = require("../models/user");

const getAllUsers = async (req, res) => {
    console.log("getAllUsers: role - ", req.user.role);
    if (req.user.role !== "superadmin") throw createError(401, "super admin rights required");
    const result = await User.find({}, {password: 0, token: 0});
    res.status(200).json({
        quantity: result.length,
        result
    })
}

module.exports = { getAllUsers };