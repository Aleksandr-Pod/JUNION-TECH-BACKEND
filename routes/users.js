const { users } = require("../controllers");
const { joiLoginSchema, joiRegSchema, joiChangePassSchema } = require("../models/user");
const { auth, ctrlWrapper, validation } = require("../middlewares");

const router = require("express").Router();

router.post("/register", validation(joiRegSchema), ctrlWrapper(users.register));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(users.login));

router.post("/restorePass", ctrlWrapper(users.restorePass));
router.post("/checkToken", ctrlWrapper(users.checkVerificationToken));
router.post("/changePass", auth, validation(joiChangePassSchema), ctrlWrapper(users.changePass));

router.get("/logout", auth, ctrlWrapper(users.logout));
router.get("/current", auth, ctrlWrapper(users.current));

module.exports = router;
