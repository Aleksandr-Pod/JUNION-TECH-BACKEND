const { Schema, model } = require("mongoose");

const sysSchema = Schema({
    articul: { type: Number }
})

const Sys = model("sys", sysSchema);

module.exports = Sys;