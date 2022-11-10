const { Schema, model } = require("mongoose");

const sysSchema = Schema({
    articul: { type: Number },
    vendorsCount: { type: Number },
    superPass: { type: String },
    role: {type: String}
})

const Sys = model("sys", sysSchema);

module.exports = Sys;