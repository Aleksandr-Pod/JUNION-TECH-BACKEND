const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    const result = await User.create({ name, email, password: hashPass, role });
    //  Auto login ...
    const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY);
    await User.findByIdAndUpdate(result._id, { token });
    res.status(201).json({
        message: "New user created and logged in", 
        data: { name, email, role, token}
    })
};

module.exports = register;