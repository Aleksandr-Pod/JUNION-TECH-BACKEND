// const express = require('express');
const {auth, ctrlWrapper} = require('../middlewares');
const getCategories = require('../controllers/categories/get');

const router = require('express').Router();

router.get('/', auth, ctrlWrapper(getCategories));

module.exports = router;

