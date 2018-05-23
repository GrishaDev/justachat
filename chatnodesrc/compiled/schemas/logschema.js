"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    id: Number,
    time: String,
    log: String,
    type: String
});
var thing = mongoose.model('logs', todoSchema);
//module.exports = Todos;
exports.logmongo = thing;
