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
var online = require("../../json/online.json");
var dblogic_1 = require("./dblogic");
//let config:any = (<any>configjson);
var usersonline = online;
var bgcolor = "#ffffff";
var dbmethods = new dblogic_1.dblogic();
var socketlogic = /** @class */ (function () {
    function socketlogic(io) {
        var _this = this;
        this.dc = true;
        this.io = io;
        io.on('connect', function (socket) {
            _this.onconnect(socket);
            socket.on('disconnect', function () {
                _this.ondc(socket);
            });
            socket.on('chat message', function (user, msg, type) {
                _this.securitytest(user, msg, type, socket);
            });
            socket.on('sendlogs', function (pass, msg) {
                if (pass == "88") {
                    this.submitLogs(msg);
                }
            });
        });
    }
    socketlogic.prototype.onconnect = function (socket) {
        var date = new Date();
        var time = date.getHours().toString() + ':' + date.getMinutes().toString();
        var person = socket.handshake.query['user'];
        var type = socket.handshake.query['type'];
        var room = socket.handshake.query['room'];
        var clientIp = socket.request.connection.remoteAddress;
        socket.join(room);
        console.log(" i will join room " + room);
        console.log(time + '||' + clientIp + ' tries to connect');
        console.log(time + '||' + person + ' connected. (' + clientIp + ')');
        online.push({ "user": person, "type": type, "socket": socket, "room": room });
        var a = this.getData("roomusers", room);
        var b = this.getData("roomtypes", room);
        console.log(a);
        console.log(b);
        //console.log(this.getData("types",room));
        this.io.to(room).emit('newuser', this.getData("roomusers", room), this.getData("roomtypes", room), bgcolor);
    };
    socketlogic.prototype.ondc = function (socket) {
        if (this.dc) {
            var userindex = this.getData("sockets", -1).indexOf(socket);
            var human = usersonline[userindex].user;
            var room = usersonline[userindex].room;
            usersonline.splice(userindex, 1);
            this.io.to(room).emit('removeuser', this.getData("users", -1), human);
            console.log(human + ' disconnected');
        }
    };
    socketlogic.prototype.securitytest = function (user, msg, type, socket) {
        var userindex = this.getData("sockets", -1).indexOf(socket);
        var human = usersonline[userindex].user;
        var typo = usersonline[userindex].type;
        if (human != user || typo != type) {
            this.ban(socket);
        }
        else {
            var command = void 0;
            var humanoid = void 0;
            var a = void 0;
            var date = new Date();
            var time = date.getHours().toString() + ':' + date.getMinutes().toString();
            console.log(time + '||' + user + msg);
            a = msg.slice(2, msg.length);
            command = a.substr(0, a.indexOf(' '));
            humanoid = a.substr(a.indexOf(' ') + 1);
            command = command.toLowerCase();
            this.commander(command, humanoid, typo, user, socket, msg);
        }
    };
    socketlogic.prototype.commander = function (command, humanoid, typo, user, socket, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var i, userindex, humanoidsocket, maxid, userindex, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(command == '/kick')) return [3 /*break*/, 1];
                        for (i = 0; i < usersonline.length; i++) {
                            if (humanoid == usersonline[i].user) {
                                console.log(typo);
                                console.log(usersonline[i].type);
                                if (typo == "dev" || typo == "admin") {
                                    userindex = this.getData("users", -1).indexOf(humanoid);
                                    humanoidsocket = usersonline[userindex].socket;
                                    this.ban(humanoidsocket);
                                    console.log(humanoid + " has been kicked by " + user);
                                }
                                else {
                                    this.ban(socket);
                                    console.log("someone tried to cheat abit");
                                }
                            }
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(command == '/color')) return [3 /*break*/, 2];
                        if (typo == "dev" || typo == "admin" || typo == "user") {
                            if (humanoid.length == 7) {
                                bgcolor = humanoid;
                                this.io.emit('changebg', user, typo, humanoid);
                                console.log(user + " has changed background color to " + humanoid);
                            }
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        maxid = 0;
                        return [4 /*yield*/, dbmethods.chatMaxId()];
                    case 3:
                        maxid = _a.sent();
                        return [4 /*yield*/, dbmethods.updateChat(maxid, user + msg, typo)];
                    case 4:
                        _a.sent();
                        userindex = this.getData("sockets", -1).indexOf(socket);
                        room = usersonline[userindex].room;
                        this.io.to(room).emit('chat message', user, msg, typo);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    socketlogic.prototype.ban = function (socket) {
        this.dc = false;
        var userindex = this.getData("sockets", -1).indexOf(socket);
        var human = usersonline[userindex].user;
        socket.emit('reload');
        var room = usersonline[userindex].room;
        this.io.to(room).emit('kick', this.getData("users", -1), human);
        console.log(human + ' kicked');
        this.dc = true;
    };
    socketlogic.prototype.getData = function (type, roomindex) {
        var data = [];
        for (var i = 0; i < usersonline.length; i++) {
            if (type === "users")
                data.push(usersonline[i].user);
            else if (type === "types")
                data.push(usersonline[i].type);
            else if (type === "rooms")
                data.push(usersonline[i].room);
            else if (type === "roomusers") {
                if (usersonline[i].room === roomindex)
                    data.push(usersonline[i].user);
            }
            else if (type === "roomtypes") {
                if (usersonline[i].room === roomindex)
                    data.push(usersonline[i].type);
            }
            else
                data.push(usersonline[i].socket);
        }
        // console.log("the data i am sending is.... "+data);
        return data;
    };
    socketlogic.prototype.submitLogs = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var maxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxid = 0;
                        return [4 /*yield*/, dbmethods.logsMaxId()];
                    case 1:
                        maxid = _a.sent();
                        return [4 /*yield*/, dbmethods.addLogs(maxid, msg)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return socketlogic;
}());
exports.socketlogic = socketlogic;
