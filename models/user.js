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
    verificationToken: {
      type: String, 
      default: null
    },
    role: {
      type: String,
      default: "admin"
    },
    superCode: {type: Number}
  },
  { versionKey: false, timestamps: true }
);

const joiRegSchema = Joi.object({
  name: Joi.string().min(3).max(60).message({
    "any.required": "The name field must consist of at least 3 letters and max 60 letters",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net", "ua", "ru", "by"] },
    })
    .min(7)
    .max(50)
    .message({
      "string.base": "Invalid mail",
    })
    .required(),
  password: Joi.string().min(6).max(20)
    .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[@#$%.?/&!\-+=_]).*)\S$/)
    .message({"string.pattern.base":
      "The password should contain one capital letter, one small letter, one figure and one of symbols @#$%.?/&!-+=_"
    })
    .required(),
  superCode: Joi.string().min(3).max(3).required()
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net", "ua", "ru", "by"] },
    })
    .min(7)
    .max(50)
    .message({
      "string.base": "Invalid mail",
    })
    .required(),
  password: Joi.string().min(6).max(20).required()
});

const joiChangePassSchema = Joi.object({
  password: Joi.string().min(6).max(20)
  .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[@#$%.?/&!\-+=_]).*)\S$/)
  .message({"string.pattern.base":
    "The password should contain one capital letter, one small letter, one figure and one of symbols @#$%.?/&!-+=_"
  })
  .required(),
  owner: Joi.string()
});

const User = model("user", userSchema);

module.exports = { User, joiRegSchema, joiLoginSchema, joiChangePassSchema };
