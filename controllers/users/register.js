const bcrypt = require('bcrypt');
const createError = require('../../helpers/createError');
const Sys = require('../../models/sys');
const {User} = require('../../models/user');

const register = async (req, res) => {
    const { name, email, password, superCode } = req.body;
    const { superPass, role } = await Sys.findById(process.env.SYS_ID);
    if (superCode !== superPass) throw createError(400, 'wrong super code');
    const user = await User.findOne({email});
    if (user) throw createError(409, `User with email: ${email} already exist`);
    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({name, email, password: hashPass, role});
    res.status(201).json({
        message: "New user created", 
        data: { name, email, role}
    })
};

module.exports = register;