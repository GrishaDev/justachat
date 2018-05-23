"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var chatmsgs = require("../../json/chatmsgs.json");
var roomsjsn = require("../../json/rooms.json");
var online = require("../../json/online.json");
var configjson = require("../../json/config.json");
var dblogic_1 = require("./dblogic");
var config = configjson;
var usersonline = online;
var jsnrooms = roomsjsn;
var stfu = chatmsgs;
var dbmethods = new dblogic_1.dblogic();
//let userslogic:UsersLogic = new UsersLogic();
var i = 0;
var user;
//let usersonline:string[] = [];
var apilogic = /** @class */ (function () {
    function apilogic() {
    }
    //usersonline:string[] = [];
    apilogic.prototype.delroom = function (res, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbmethods.removeRoom(id.toString())];
                    case 1:
                        _a.sent();
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ ok: true }));
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.newroom = function (title, res) {
        return __awaiter(this, void 0, void 0, function () {
            var maxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxid = 0;
                        return [4 /*yield*/, dbmethods.roomsMaxId()];
                    case 1:
                        maxid = _a.sent();
                        return [4 /*yield*/, dbmethods.updateRooms(maxid, title)];
                    case 2:
                        _a.sent();
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ ok: true }));
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.makeRooms = function (res, req) {
        return __awaiter(this, void 0, void 0, function () {
            var rooms, titles, ids, i_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("auth for /rooms, sending init rooms..");
                        rooms = [];
                        titles = [];
                        ids = [];
                        return [4 /*yield*/, dbmethods.getRooms()];
                    case 1:
                        _a.sent();
                        if (!(jsnrooms.rooms.length === 0 || jsnrooms.rooms.length === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, dbmethods.updateRooms(0, "public")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, dbmethods.getRooms()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        for (i_1 = 0; i_1 < jsnrooms.rooms.length; i_1++) {
                            rooms.push(this.getRoomCount(i_1));
                            titles.push(jsnrooms.rooms[i_1].title);
                            ids.push(jsnrooms.rooms[i_1].id);
                        }
                        // console.log(jsnrooms[0].rooms.title);
                        // console.log(jsnrooms[0].title);
                        // console.log(jsnrooms.rooms[0]);
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ ok: true, rooms: rooms, titles: titles,
                            ids: ids, user: req.session.user, type: req.session.type }));
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.getRoomCount = function (index) {
        var x = 0;
        for (var i_2 = 0; i_2 < usersonline.length; i_2++) {
            if (usersonline[i_2].room == index)
                x++;
        }
        return x;
    };
    apilogic.prototype.chosed = function (res, req, chosed, room) {
        req.session.chosed = chosed;
        req.session.room = room;
        console.log(req.session);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ user: req.session.user, ok: true }));
        res.end();
    };
    apilogic.prototype.hello = function (res, req) {
        return __awaiter(this, void 0, void 0, function () {
            var checker, _user, i_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersonline = online;
                        checker = true;
                        _user = { user: req.session.user, type: req.session.type,
                            logged: req.session.logged, wrong: req.session.wrong, room: req.session.room };
                        for (i_3 = 0; i_3 < usersonline.length; i_3++) {
                            if (req.session.user == usersonline[i_3].user) {
                                console.log(checker);
                                checker = false;
                            }
                        }
                        if (!checker) return [3 /*break*/, 2];
                        return [4 /*yield*/, dbmethods.getChat()];
                    case 1:
                        _a.sent();
                        console.log(_user);
                        console.log(chatmsgs);
                        console.log("----------------- AM I HERE  ------------ ");
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ ok: true, user: req.session.user,
                            type: req.session.type, chatmsgs: chatmsgs }));
                        res.end();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log(checker);
                        res.sendFile(path.join(__dirname, '../../client/dont.html'));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.Loginpage = function (res) {
        // res.sendFile(path.join(__dirname , '../../client/login.html'));
        res.sendFile(path.join(__dirname, '../../client/login/index.html'));
    };
    apilogic.prototype.LoginCheck = function (res, req, user, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var result, o, checker, i_4, wa, i_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbmethods.login(user, pass)];
                    case 1:
                        result = _a.sent();
                        if (result.type) {
                            o = '[halva]' + user;
                            checker = true;
                            for (i_4 = 0; i_4 < usersonline.length; i_4++) {
                                if (o == usersonline[i_4].user) {
                                    console.log("already logged in");
                                    req.session.logged = true;
                                    res.writeHead(200, { "Content-Type": "application/json" });
                                    res.write(JSON.stringify({ user: req.session.user, wrong: req.session.wrong, logged: req.session.logged }));
                                    res.end();
                                    checker = false;
                                }
                            }
                            if (checker) {
                                req.session.user = o;
                                req.session.pass = pass;
                                req.session.type = result.type;
                                req.session.logged = false;
                                req.session.wrong = false;
                                res.writeHead(200, { "Content-Type": "application/json" });
                                res.write(JSON.stringify({ user: req.session.user, wrong: req.session.wrong, logged: req.session.logged }));
                                res.end();
                            }
                        }
                        else {
                            console.log(result);
                            wa = true;
                            if (pass == "magicalnothingwaw23awaw") {
                                for (i_5 = 0; i_5 < usersonline.length; i_5++) {
                                    if (user == usersonline[i_5]) {
                                        console.log("(hobo)already logged in");
                                        req.session.logged = true;
                                        res.writeHead(200, { "Content-Type": "application/json" });
                                        res.write(JSON.stringify({ user: req.session.user, wrong: req.session.wrong, logged: req.session.logged })); // You Can Call Response.write Infinite Times BEFORE response.end
                                        res.end();
                                        wa = false;
                                    }
                                }
                                if (wa) {
                                    req.session.user = user;
                                    req.session.type = "hobo";
                                    req.session.logged = false;
                                    req.session.wrong = false;
                                    res.writeHead(200, { "Content-Type": "application/json" });
                                    res.write(JSON.stringify({ user: req.session.user, wrong: req.session.wrong })); // You Can Call Response.write Infinite Times BEFORE response.end
                                    res.end();
                                }
                            }
                            else {
                                req.session.wrong = true;
                                res.writeHead(200, { "Content-Type": "application/json" });
                                res.write(JSON.stringify({ user: req.session.user, wrong: req.session.wrong })); // You Can Call Response.write Infinite Times BEFORE response.end
                                res.end();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.getUsers = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbmethods.jsonUsers()];
                    case 1:
                        a = _a.sent();
                        res.json(a);
                        console.log("printed user list");
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.editUser = function (idd, name, pass, type) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = +idd;
                        if (!!isNaN(id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, dbmethods.edituser(id, name, pass, type)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log("ERROR: didn't input valid id");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.addUser = function (res, name, pass, type) {
        return __awaiter(this, void 0, void 0, function () {
            var maxid, result, worked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type == "uni")) return [3 /*break*/, 1];
                        maxid = 22222;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, dbmethods.usersMaxId()];
                    case 2:
                        maxid = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, dbmethods.register(name, pass)];
                    case 4:
                        result = _a.sent();
                        if (!(result === "fine")) return [3 /*break*/, 6];
                        return [4 /*yield*/, dbmethods.addUser(maxid, name, pass, type)];
                    case 5:
                        worked = _a.sent();
                        if (worked) {
                            console.log("user added succesfuly");
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.write(JSON.stringify({ status: true })); // You Can Call Response.write Infinite Times BEFORE response.end
                            res.end();
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        if (result === "used") {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.write(JSON.stringify({ status: false })); // You Can Call Response.write Infinite Times BEFORE response.end
                            res.end();
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.removeUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        a = id;
                        return [4 /*yield*/, dbmethods.removeuser(a)];
                    case 1:
                        _a.sent();
                        console.log("removed user " + a);
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.getAllLogs = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbmethods.getlogs()];
                    case 1:
                        a = _a.sent();
                        res.json(a);
                        console.log("printed all logs");
                        return [2 /*return*/];
                }
            });
        });
    };
    apilogic.prototype.help = function (res) {
        res.sendFile(path.join(__dirname, '../../client/help.txt'));
    };
    return apilogic;
}());
exports.apilogic = apilogic;
