"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router_1 = require("./router");
var bodyParser = require("body-parser");
var session = require("express-session");
var server = express();
server.set('view engine', 'ejs');
server.use('/', express.static('client'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session({
    secret: "waw",
    resave: true,
    saveUninitialized: true
}));
server.use('/', router_1.apirouter);
exports.default = server;
