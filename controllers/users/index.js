const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const restorePass = require('./restorePass');
const checkVerificationToken = require('./checkVerificationToken');
const changePass = require("./changePass");

module.exports = {register, login, logout, current, restorePass, checkVerificationToken, changePass};
