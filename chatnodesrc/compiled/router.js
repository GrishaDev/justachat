"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apilogic_1 = require("./apilogic");
var configjson = require("../json/config.json");
var config = configjson;
var router = express_1.Router();
var methods = new apilogic_1.apilogic();
router.get('/', function (req, res) {
    methods.hello(res);
});
router.get('/users/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.getUsers(res);
});
router.get('/logs', function (req, res) {
    methods.getAllLogs(res);
});
router.get('/apihelp', function (req, res) {
    methods.help(res);
});
router.get('/login/:name/:pass', function (req, res) {
    methods.Login(req.params.name, req.params.pass);
});
router.get('/register/:name/:pass', function (req, res) {
    methods.Register(req.params.name, req.params.pass);
});
router.get('/edit/:usernum/:name/:pass/:type/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.editUser(req.params.usernum, req.params.name, req.params.pass, req.params.type);
});
router.get('/adduser/:name/:pass/:type/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.addUser(req.params.name, req.params.pass, req.params.type);
});
router.get('/removeuser/:usernum/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.removeUser(req.params.usernum);
});
exports.apirouter = router;
