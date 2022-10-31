const { Schema, model } = require('mongoose');
const Joi = require('joi');

const vendorSchema = Schema({
    name: { type: String, required: [true, "vendor name is required"] },
    regCode: {type: String, required: [true, "vendor registration code is required"]},
    code: { type: String, required: [true, "vendor code is required"] },
    itemsCounter: { type: Number, default: 0 },
    address: { type: String },
    owner: {type:String, required: [true, "owner is required"]}
}, {
    versionKey: false, timestamps: true
});

const joiAddVendorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    regCode: Joi.string().regex(/^[0-9]{8}$/),
    code: Joi.string().regex(/^[0-9]{3}$/),
    address: Joi.string().min(10).max(80),
    owner: Joi.string().required()
})
const joiUpdateVendorSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    regCode: Joi.string().regex(/^[0-9]{8}$/),
    code: Joi.string().regex(/^[0-9]{3}$/),
    address: Joi.string().min(10).max(80),
    owner: Joi.string().required(),
    id: Joi.string().required()
})
const Vendor = model('vendor', vendorSchema)
module.exports = {Vendor, joiAddVendorSchema, joiUpdateVendorSchema}