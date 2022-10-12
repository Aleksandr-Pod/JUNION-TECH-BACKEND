const express = require("express");
const { products: ctrl} = require("../controllers");
const { joiAddProductSchema } = require("../models/product");
const { auth, ctrlWrapper, validation } = require("../middlewares");

const router = express.Router();

router.post("/", auth, validation(joiAddProductSchema), ctrlWrapper(ctrl.addProduct));
router.get("/", auth, ctrlWrapper(ctrl.getAllProducts));
router.delete("/", auth, ctrlWrapper(ctrl.deleteProduct));
// router.update("/", auth, validation(joiSchema), ctrlWrapper(ctrl.update))

module.exports = router;
