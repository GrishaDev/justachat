import mongoose = require('mongoose');

var Schema:any = mongoose.Schema;

var todoSchema: mongoose.Schema = new Schema({
    id:   Number,
    time: String,
    log:  String,
    type: String
});

var thing = mongoose.model('logs', todoSchema);

//module.exports = Todos;
export const logmongo = thing;