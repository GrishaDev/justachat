import mongoose = require('mongoose');

var Schema:any = mongoose.Schema;

var todoSchema: mongoose.Schema = new Schema({
    id:   Number,
    title:  String,
});

var thing = mongoose.model('rooms', todoSchema);

//module.exports = Todos;
export const roomsmongo = thing;