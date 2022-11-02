const { users } = require("../controllers");
const { joiLoginSchema, joiRegSchema } = require("../models/user");
const { auth, ctrlWrapper, validation } = require("../middlewares");

const router = require("express").Router();

router.post("/register", validation(joiRegSchema), ctrlWrapper(users.register));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(users.login));
router.get("/logout", auth, ctrlWrapper(users.logout));
router.get("/current", auth, ctrlWrapper(users.current));

module.exports = router;
