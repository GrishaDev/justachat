"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./logic/server");
var mongoose = require("mongoose");
var iosocket = require("socket.io");
var httpy = require("http");
var socketlogic_1 = require("./logic/socketlogic");
var configjson = require("../json/config.json");
var online = require("../json/online.json");
var config = configjson;
var usersonline = online;
var port = process.env.PORT || 3200;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds119028.mlab.com:19028/halva');
var http = new httpy.Server(server_1.default);
http.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});
var io;
io = iosocket(http);
var socketserv = new socketlogic_1.socketlogic(io);
