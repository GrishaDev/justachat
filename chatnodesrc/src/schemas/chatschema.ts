import mongoose = require('mongoose');

var Schema:any = mongoose.Schema;

var todoSchema: mongoose.Schema = new Schema({
    id:   Number,
    msg:  String,
    type: String
});

var thing = mongoose.model('chat', todoSchema);

//module.exports = Todos;
export const chatmongo = thing;