const express = require("express");
// const { users: ctrl } = require("../controllers/users/users");
// const { joiLoginSchema, joiRegSchema } = require("../models/user");
// const { auth, ctrlWrapper, validation } = require("../middlewares");

const router = express.Router();

// router.post("/register", validation(joiRegSchema), ctrlWrapper(ctrl.register));
// router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
// router.get("/logout", auth, ctrlWrapper(ctrl.logout));
// router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
