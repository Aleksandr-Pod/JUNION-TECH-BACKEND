const bcrypt = require('bcrypt');
const createError = require('../../helpers/createError');
const {User} = require('../../models/user');

const register = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if (user) throw createError(409);
    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({email, password: hashPass, name});
    res.json({
        status: "success",
        code: 201,
        message: "New user created", 
        data: {name, email}
    })

};

module.exports = register;