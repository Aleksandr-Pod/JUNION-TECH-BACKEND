const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [ bearer, token ] = authorization.split(" ");
  try {
    if ( bearer !== "Bearer" ) throw createError(401);
    
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) throw createError(401);

    req.user = user;
    req.body.owner = user.email;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") error.status = 401;
    next(error);
  }
};

module.exports = auth;
