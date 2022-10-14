const {Schema, model} = require('mongoose');
const Joi = require('joi');

const productSchema = Schema({
    name: {type: String, required: [true, "product name is required"]},
    price: {type: Number},
    category: {type: String},
    owner: {type: String, required: [true, "owner is required"]}
}, { versionKey: false, timestamps: true });

const joiAddProductSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(0),
    category: Joi.string().min(2).max(20),
    owner: Joi.string().required()
})
const joiUpdateProductSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    price: Joi.number().min(0),
    category: Joi.string().min(2).max(20),
    owner: Joi.string().required(),
    id: Joi.string().required()
})
const Product = model('product', productSchema);
module.exports = {Product, joiAddProductSchema, joiUpdateProductSchema};