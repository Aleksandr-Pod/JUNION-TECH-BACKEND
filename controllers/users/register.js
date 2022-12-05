const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../../helpers/createError');
const Sys = require('../../models/sys');
const { User } = require('../../models/user');

const register = async ( req, res ) => {
  const { SYS_ID, SECRET_KEY } = process.env;
  const { name, email, password, superCode } = req.body;
  const { superPass, role } = await Sys.findById(SYS_ID);

  if (superCode !== superPass) throw createError(400, 'wrong super code');

  const user = await User.findOne({ email });
  if (user) throw createError(409, `User with email: ${email} already exist`);
  
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const hashAnswer = bcrypt.hashSync(answer, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPass, role });

  //  Auto login ...
  const { _id } = result;
  // console.time();
  result.token = jwt.sign({ id: _id }, SECRET_KEY);
  // console.timeEnd();
  result.save();

  res.status(201).json({
      message: "New user created and logged in", 
      user: { _id, name, email, role, token: result.token}
  })
};

module.exports = register;