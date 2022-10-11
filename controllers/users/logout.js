const {User} = require('../../models/user');

const logout = async(req, res) => {
    await User.findByIdAndUpdate(req.user._id, {token: null});
    res.status(204).json({message: "logout successfull"});
};

module.exports = logout;