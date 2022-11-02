const {Schema, model} = require('mongoose');
const Joi = require('joi');

const productSchema = Schema({
    name: {type: String, required: [true, "product name is required"]},
    price: { type: Number },
    quantity: { type: Number },
    category: { type: Array },
    discountPrice: {type: Number, default: 0},
    vendor: {type: String, required: [true, "vendor code is required"]},
    art: { type: String, required: [true, 'product code is required'] },
    owner: {type: String, required: [true, "owner is required"]}
}, { versionKey: false, timestamps: true });

const joiAddProductSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    price: Joi.number().min(0).max(999999),
    quantity: Joi.number().min(0).max(999),
    category: Joi.string().min(2).max(30),
    vendor: Joi.string().regex(/^[0-9]{3}$/),
    art: Joi.string().regex(/^[0-9]{4}$/),
    owner: Joi.string().required()
})
const joiUpdateProductSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    price: Joi.number().min(0).max(999999),
    quantity: Joi.number().min(0).max(999),
    category: Joi.string().min(2).max(30),
    vendor: Joi.string().regex(/^[0-9]{3}$/),
    art: Joi.string().regex(/^[0-9]{4}$/),
    owner: Joi.string().required(),
    id: Joi.string().required()
})
const Product = model('product', productSchema);
module.exports = {Product, joiAddProductSchema, joiUpdateProductSchema};