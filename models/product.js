const {Schema, model} = require('mongoose');
// const Joi = require('joi');

const productSchema = Schema({
    name: {type: String},
    required: [true, "product name is required"]
});

const Product = model('product', productSchema);
module.exports = {Product};