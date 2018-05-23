"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router_1 = require("./router");
var server = express();
server.set('view engine', 'ejs');
server.use('/', express.static('client'));
server.use('/', router_1.apirouter);
exports.default = server;
