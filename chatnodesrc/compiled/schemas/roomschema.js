"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    id: Number,
    title: String,
});
var thing = mongoose.model('rooms', todoSchema);
//module.exports = Todos;
exports.roomsmongo = thing;
