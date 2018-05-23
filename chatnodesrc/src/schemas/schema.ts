import mongoose = require('mongoose');

var Schema:any = mongoose.Schema;

var todoSchema: mongoose.Schema = new Schema({
    id:   Number,
    name: String,
    pass: String,
    type: String
});

var thing = mongoose.model('users', todoSchema);

//module.exports = Todos;
export const mongo = thing;