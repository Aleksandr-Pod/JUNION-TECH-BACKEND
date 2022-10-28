const {User} = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../../helpers/createError');

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) throw createError(404);
    const passCheck = bcrypt.compareSync(password, user.password);
    if (!passCheck) throw createError(404);
    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    await User.findByIdAndUpdate(user._id, {token});
    res.status(200).json({
        message: 'login successfull',
        token,
        role: user.role
    })
};

module.exports = login;