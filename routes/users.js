const { users } = require("../controllers");
const { joiLoginSchema, joiRegSchema } = require("../models/user");
const { auth, authByAnswer, ctrlWrapper, validation } = require("../middlewares");

const router = require("express").Router();

router.post("/register", validation(joiRegSchema), ctrlWrapper(users.register));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(users.login));
// router.post("/changepass", authByAnswer, ctrlWrapper(users.changePass));
router.post("/restorePass", ctrlWrapper(users.restorePass));
router.get("/profile/:verificationToken", ctrlWrapper(users.checkVerificationToken));
router.get("/changingPass", (req, res) => res.send({message: "password changed"}) );
router.get("/logout", auth, ctrlWrapper(users.logout));
router.get("/current", auth, ctrlWrapper(users.current));

module.exports = router;
