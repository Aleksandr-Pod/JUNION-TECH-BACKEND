const User = require('../models/user');
const createError = require('../helpers/createError');
const bcrypt = require('bcrypt');

const authByAnswer = async (req, res, next) => {
  const { email, question, answer } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw createError(404);
    if (user.question !== question) throw createError(404);
    const answerCheck = bcrypt.compareSync(answer, user.answer);
    if (!answerCheck) throw createError(404);
  } catch (error) {
      next(error)
  }
    

}

module.exports = authByAnswer;