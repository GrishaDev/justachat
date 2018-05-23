"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    id: Number,
    name: String,
    pass: String,
    type: String
});
var thing = mongoose.model('users', todoSchema);
//module.exports = Todos;
exports.mongo = thing;
