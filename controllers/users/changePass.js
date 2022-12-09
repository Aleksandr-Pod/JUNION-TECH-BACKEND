const { User } = require("../../models/user");
const bcrypt = require('bcrypt');

const changePass = async( req, res ) => {
    const { password, owner } = req.body;
    
    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const updatedPass = await User.findOneAndUpdate({ email: owner }, { password: hashPass }, { new: true });
    res.json({
        message: "password updated",
        updatedPass
    })
}
module.exports = changePass;