const {User} = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../../helpers/createError');

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User
        .findOne({ email })
        .select({ password: 1, token: 1, role: 1 })
        // .lean() // возвращает только объет
        .exec();
    
    if (!user) {
        throw createError(404)
    };

    const passCheck = bcrypt.compareSync(password, user.password);

    if (!passCheck) {
        throw createError(404)
    };
    
    user.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    await user.save();

    // await User.findByIdAndUpdate(user._id, { token });
    
    res.json({
        message: 'login successfull',
        token: user.token,
        role: user.role
    })
};

module.exports = login;