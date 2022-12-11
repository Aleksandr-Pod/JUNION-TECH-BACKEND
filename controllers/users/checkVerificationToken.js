const jwt = require('jsonwebtoken');
const createError = require("../../helpers/createError");
const { User } = require("../../models/user");

const checkVerificationToken = async(req, res) => {

  const { verifyToken } = req.body;
  if (!verifyToken) throw createError(400, `verifyToken ${verifyToken} required`)

  const user = await User
    .findOne({ verificationToken: verifyToken })
    .select({ email: 1, role: 1 });

  if (!user) throw createError(404, "no user with verificationToken:" + verifyToken);
  
  user.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  user.verificationToken = null;
  await user.save();

  res.send({ user });
}

module.exports = checkVerificationToken;