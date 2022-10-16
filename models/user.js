const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      requiered: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      requiered: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "admin"
    }
  },
  { versionKey: false, timestamps: true }
);

const joiRegSchema = Joi.object({
  name: Joi.string().min(3).max(12).message({
    "any.required": "The name field must consist of at least 3 letters and max 12 letters",
  }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .message({
      "string.base": "Invalid mail",
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .message({
      "string.base": "Invalid mail",
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = { User, joiRegSchema, joiLoginSchema };
