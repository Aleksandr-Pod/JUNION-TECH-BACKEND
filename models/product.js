const {Schema, model} = require('mongoose');
const Joi = require('joi');

const productSchema = Schema({
    name: {type: String, required: [true, "product name is required"]},
    price: { type: Number },
    quantity: { type: Number },
    category: { type: Array },
    vendor: {type: String, required: [true, "vendor code is required"]},
    art: { type: String, required: [true, 'product code is required'] },
    owner: {type: String, required: [true, "owner is required"]}
}, { versionKey: false, timestamps: true });

const joiAddProductSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    price: Joi.number().min(0),
    quantity: Joi.number().min(0),
    category: Joi.string().min(2).max(30),
    vendor: Joi.string().min(3).max(3),
    art: Joi.string().min(6).max(6),
    owner: Joi.string().required()
})
const joiUpdateProductSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    price: Joi.number().min(0),
    quantity: Joi.number().min(0),
    category: Joi.string().min(2).max(30),
    vendor: Joi.string().min(3).max(3),
    art: Joi.string().min(6).max(6),
    owner: Joi.string().required(),
    id: Joi.string().required()
})
const Product = model('product', productSchema);
module.exports = {Product, joiAddProductSchema, joiUpdateProductSchema};