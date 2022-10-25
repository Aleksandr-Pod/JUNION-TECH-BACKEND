// const express = require("express");
const { products: ctrl} = require("../controllers");
const { joiAddProductSchema, joiUpdateProductSchema } = require("../models/product");
const { auth, ctrlWrapper, validation } = require("../middlewares");

const router = require("express").Router();

router.post("/", auth, validation(joiAddProductSchema), ctrlWrapper(ctrl.addProduct));
router.get("/", auth, ctrlWrapper(ctrl.getProducts));
router.get("/today", auth, ctrlWrapper(ctrl.getTodayProducts))
router.delete("/", auth, ctrlWrapper(ctrl.deleteProduct));
router.put("/", auth, validation(joiUpdateProductSchema), ctrlWrapper(ctrl.updateProduct))

module.exports = router;
