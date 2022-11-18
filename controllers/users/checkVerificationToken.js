const jwt = require('jsonwebtoken');
const createError = require("../../helpers/createError");
const {User} = require("../../models/user");

const checkVerificationToken = async(req, res) => {
  const {verificationToken} = req.params;
  const user = User
    .findOne({verificationToken})
    .select({email: 1, role: 1})
  ;
  if (!user) throw createError(404, "no user with verificationToken:" + verificationToken);
  
  user.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  user.save();

  res.send({user});
}

module.exports = checkVerificationToken;