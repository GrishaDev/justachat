"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apilogic_1 = require("./apilogic");
var configjson = require("../../json/config.json");
var config = configjson;
var router = express_1.Router();
var methods = new apilogic_1.apilogic();
var hash = '';
router.get(hash + '/chat', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    }
    else {
        if (req.session.chosed)
            // methods.hello(res,req);
            console.log("nothing hAHA");
        else
            res.redirect('/#/rooms');
    }
});
router.get(hash + '/rooms', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    }
    else if (req.session.chosed) {
        // methods.hello(res,req);
        console.log('o');
    }
    else {
        methods.makeRooms(res, req);
    }
});
router.get('/', function (req, res) {
    if (req.session.user) {
        res.redirect(hash + '/rooms');
    }
    else {
        methods.Loginpage(res);
    }
});
router.get(hash + '/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});
router.post('/loginsubmit', function (req, res) {
    //console.log("AM I HERE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var user = req.body.user;
    var pass = req.body.pass;
    // console.log(user);
    methods.LoginCheck(res, req, user, pass);
    //  req.session.user = user;
    // req.session.pass = pass;
    //check in database
    //if is correct = add to session object with user and password and type + send true
    //if is not correct = send false
    //if is temp user = add to session ... + send true
    // return res.json({login: true});//redirect('/chat');
    //console.log("n");
    // console.log(req.body.jsn.pass);
});
router.post('/accsubmit', function (req, res) {
    var user = req.body.user;
    var pass = req.body.pass;
    methods.addUser(res, user, pass, "user");
});
router.post('/newroom', function (req, res) {
    console.log("new room..");
    var title = req.body.name;
    methods.newroom(title, res);
});
router.post('/chatenter', function (req, res) {
    console.log("chosed room..");
    var room = req.body.room;
    var chosed = req.body.chosed;
    console.log(room, chosed);
    methods.chosed(res, req, chosed, room);
});
router.post('/delroom', function (req, res) {
    console.log("deleting room..");
    var room = req.body.room;
    var id = req.body.id;
    methods.delroom(res, id);
});
router.get('/getuser', function (req, res) {
    methods.hello(res, req);
});
router.get('/users/:passe', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.params.passe == config.apipass)
        methods.getUsers(res);
});
router.get('/logs', function (req, res) {
    methods.getAllLogs(res);
});
router.get('/apihelp', function (req, res) {
    methods.help(res);
});
// router.get('/login/:name/:pass', (req:Request, res:Response) => 
// {
//     methods.Login(req.params.name,req.params.pass);
// })
// router.get('/register/:name/:pass', (req:Request, res:Response) => 
// {
//     methods.Register(req.params.name,req.params.pass)
// })
router.get('/edit/:usernum/:name/:pass/:type/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.editUser(req.params.usernum, req.params.name, req.params.pass, req.params.type);
});
router.get('/adduser/:name/:pass/:type/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.addUser(res, req.params.name, req.params.pass, req.params.type);
});
router.get('/removeuser/:usernum/:passe', function (req, res) {
    if (req.params.passe == config.apipass)
        methods.removeUser(req.params.usernum);
});
exports.apirouter = router;
