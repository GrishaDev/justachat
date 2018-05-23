"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    id: Number,
    msg: String,
    type: String
});
var thing = mongoose.model('chat', todoSchema);
//module.exports = Todos;
exports.chatmongo = thing;
