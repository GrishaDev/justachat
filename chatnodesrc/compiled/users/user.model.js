"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userScheme = new mongoose_1.Schema({
    id: Number,
    name: String,
    pass: String,
    type: String
});
exports.userModel = mongoose_1.model('usersa', userScheme);
