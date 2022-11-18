const {User} = require('../../models/user');
const sendEmail = require('../../helpers/sendEmail');
const createError = require('../../helpers/createError');

const restorePass = async (req, res) => {
  const { email } = req.body;
  if (!email) throw createError(400, "email required");

  const user = await User.findOne({ email });
  if (!user) throw createError(404);

  user.verificationToken = Date.now().toString();
  user.save();

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello dear customer </h4><br/>
    <p>We found you've been registered.</P>
    <a target="_blank" href="http://localhost:3000/users/profile/${user.verificationToken}">
    Please, press here to redirect to your account</a>`
  }
    sendEmail(mail);

  res.status(200).json({
      "message": "Verification email sent"
  })

}

module.exports = restorePass;