const { ctrlWrapper, auth } = require("../middlewares");
const ctrl = require("../controllers/super");
const router = require("express").Router();

router.get('/', auth, ctrlWrapper(ctrl.getAllUsers));

module.exports = router;