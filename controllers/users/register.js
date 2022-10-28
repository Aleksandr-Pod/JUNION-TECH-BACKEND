const bcrypt = require('bcrypt');
const createError = require('../../helpers/createError');
const {User} = require('../../models/user');

const register = async (req, res) => {
    const { name, email, password, superCode } = req.body;
    if (superCode !== process.env.SUPER_CODE) throw createError(400, 'wrong super code');
    const user = await User.findOne({email});
    if (user) throw createError(409, `User with email: ${email} already exist`);
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