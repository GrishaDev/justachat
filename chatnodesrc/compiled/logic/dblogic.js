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
var logschema_1 = require("../schemas/logschema");
var chatschema_1 = require("../schemas/chatschema");
var roomschema_1 = require("../schemas/roomschema");
var schema_1 = require("../schemas/schema");
var chatmsgs = require("../../json/chatmsgs.json");
var roomsjsn = require("../../json/rooms.json");
var bcrypt = require("bcrypt");
var loginit = require("../../json/logsinit.json");
var logsjson = require("../../json/logs.json");
var userjson = require("../../json/userlist.json");
var userinit = require("../../json/users.json");
var stfu = chatmsgs;
var jsnrooms = roomsjsn;
var dblogic = /** @class */ (function () {
    function dblogic() {
    }
    dblogic.prototype.getRooms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roomsjsn.rooms = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, roomschema_1.roomsmongo.find({})];
                    case 2:
                        obj = _a.sent();
                        for (i = 0; i < obj.length; i++) {
                            roomsjsn.rooms.push({ id: obj[i].toObject().id,
                                title: obj[i].toObject().title
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("dberror:: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.getChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, h, i, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatmsgs.chatmsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, chatschema_1.chatmongo.find({})];
                    case 2:
                        obj = _a.sent();
                        if (obj.length > 10)
                            h = obj.length - 10;
                        else
                            h = 0;
                        for (i = h; i < obj.length; i++) {
                            chatmsgs.chatmsgs.push({ id: obj[i].toObject().id,
                                msg: obj[i].toObject().msg,
                                type: obj[i].toObject().type
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log("dberror:: " + err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.login = function (name, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var usr, hash, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, schema_1.mongo.find({ name: name })];
                    case 1:
                        usr = _a.sent();
                        if (!(usr && usr.length)) return [3 /*break*/, 3];
                        hash = bcrypt.hashSync(pass, 10);
                        return [4 /*yield*/, bcrypt.compare(pass, usr[0].toObject().pass)];
                    case 2:
                        res = _a.sent();
                        if (res)
                            return [2 /*return*/, usr[0].toObject()];
                        else
                            return [2 /*return*/, "wrong pass"];
                        _a.label = 3;
                    case 3: return [2 /*return*/, "user not found"];
                    case 4:
                        err_3 = _a.sent();
                        console.log("dberror:: " + err_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.register = function (name, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, schema_1.mongo.find({ name: name })];
                    case 1:
                        obj = _a.sent();
                        if (obj && obj.length) {
                            console.log("name already in use");
                            return [2 /*return*/, "used"];
                        }
                        else {
                            return [2 /*return*/, "fine"];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log("dberror:: " + err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.addUser = function (maxid, name, pass, type) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, person, insertmongo;
            return __generator(this, function (_a) {
                try {
                    hash = bcrypt.hashSync(pass, 10);
                    person = { "id": maxid + 1, "name": name, "pass": hash,
                        "type": type };
                    insertmongo = new schema_1.mongo(person);
                    insertmongo.save();
                    return [2 /*return*/, true];
                }
                catch (err) {
                    console.log("dberror:: " + err);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    dblogic.prototype.edituser = function (id, name, pass, type) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hash = bcrypt.hashSync(pass, 10);
                        return [4 /*yield*/, schema_1.mongo.findOneAndUpdate({ id: id }, { $set: { name: name, pass: hash, type: type } }, { new: true })];
                    case 1:
                        _a.sent();
                        console.log("edited user " + id);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log("ERROR #9A2F(0100011001) ? > SYSTEM :{H.PPD ID 23ACD2F? -> error");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.removeuser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, schema_1.mongo.remove({ "id": id })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        console.log("dberror:: " + err_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.getlogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, i, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, logschema_1.logmongo.find({})];
                    case 1:
                        obj = _a.sent();
                        if (!!obj.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, logschema_1.logmongo.create(loginit.logs)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, loginit];
                    case 3:
                        logsjson.logs = [];
                        for (i = 0; i < obj.length; i++) {
                            logsjson.logs.push({ id: obj[i].toObject().id,
                                time: obj[i].toObject().time,
                                log: obj[i].toObject().log,
                                type: obj[i].toObject().type
                            });
                        }
                        return [2 /*return*/, logsjson];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_7 = _a.sent();
                        console.log("dberror:: " + err_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.jsonUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, i, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, schema_1.mongo.find({})];
                    case 1:
                        obj = _a.sent();
                        if (!!obj.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, schema_1.mongo.create(userinit.users)];
                    case 2:
                        _a.sent();
                        console.log("new user db");
                        return [2 /*return*/, userinit];
                    case 3:
                        userjson.users = [];
                        for (i = 0; i < obj.length; i++) {
                            userjson.users.push({ id: obj[i].toObject().id,
                                name: obj[i].toObject().name,
                                pass: obj[i].toObject().pass,
                                type: obj[i].toObject().type
                            });
                        }
                        return [2 /*return*/, userjson];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_8 = _a.sent();
                        console.log("dberror:: " + err_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.usersMaxId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, maxid, i, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, schema_1.mongo.find({})];
                    case 1:
                        obj = _a.sent();
                        maxid = void 0;
                        if (obj != null) {
                            maxid = obj[0].toObject().id;
                            console.log(obj.length);
                            for (i = 0; i < obj.length; i++) {
                                if (obj[i].toObject().id > maxid) {
                                    maxid = obj[i].toObject().id;
                                }
                            }
                            return [2 /*return*/, maxid];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        console.log("dberror:: " + err_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.logsMaxId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, maxid, i, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, logschema_1.logmongo.find({})];
                    case 1:
                        obj = _a.sent();
                        maxid = void 0;
                        if (obj != null) {
                            maxid = obj[0].toObject().id;
                            console.log(obj.length);
                            for (i = 0; i < obj.length; i++) {
                                if (obj[i].toObject().id > maxid) {
                                    maxid = obj[i].toObject().id;
                                }
                            }
                            return [2 /*return*/, maxid];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_10 = _a.sent();
                        console.log("dberror:: " + err_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.chatMaxId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, maxid, i, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chatschema_1.chatmongo.find({})];
                    case 1:
                        obj = _a.sent();
                        maxid = 0;
                        if (obj != null) {
                            maxid = obj[0].toObject().id;
                            console.log(obj.length);
                            for (i = 0; i < obj.length; i++) {
                                if (obj[i].toObject().id > maxid) {
                                    maxid = obj[i].toObject().id;
                                }
                            }
                            return [2 /*return*/, maxid];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_11 = _a.sent();
                        console.log("dberror:: " + err_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.getChatLen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chatschema_1.chatmongo.find({})];
                    case 1:
                        obj = _a.sent();
                        if (obj != null)
                            return [2 /*return*/, obj.length];
                        return [3 /*break*/, 3];
                    case 2:
                        err_12 = _a.sent();
                        console.log("dberror:: " + err_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.roomsMaxId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, maxid, i, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, roomschema_1.roomsmongo.find({})];
                    case 1:
                        obj = _a.sent();
                        maxid = void 0;
                        if (obj != null) {
                            maxid = obj[0].toObject().id;
                            console.log(obj.length);
                            for (i = 0; i < obj.length; i++) {
                                if (obj[i].toObject().id > maxid) {
                                    maxid = obj[i].toObject().id;
                                }
                            }
                            return [2 /*return*/, maxid];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_13 = _a.sent();
                        console.log("dberror:: " + err_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.addLogs = function (id, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var insertmongo, log, date, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        insertmongo = void 0;
                        log = void 0;
                        date = new Date();
                        log = { "id": id + 1, "time": date.toString(), "log": msg,
                            "type": "normal" };
                        insertmongo = new logschema_1.logmongo(log);
                        return [4 /*yield*/, insertmongo.save()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_14 = _a.sent();
                        console.log("dberror:: " + err_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.updateChat = function (id, msg, typo) {
        return __awaiter(this, void 0, void 0, function () {
            var insertmongo, chatlog, len, offset, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        insertmongo = void 0;
                        chatlog = void 0;
                        len = void 0;
                        offset = 0;
                        if (id == undefined)
                            id = 0;
                        console.log(" ::::::::::::::::::::::: hello? " + id);
                        chatlog = { "id": id + 1, "msg": msg,
                            "type": typo };
                        insertmongo = new chatschema_1.chatmongo(chatlog);
                        return [4 /*yield*/, insertmongo.save()];
                    case 1:
                        _a.sent();
                        if (!(id + 1 > 15)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.removeChat(id - 15)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_15 = _a.sent();
                        console.log("dberror:: " + err_15);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.updateRooms = function (id, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var insertmongo, rooms, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        insertmongo = void 0;
                        rooms = void 0;
                        rooms = { "id": id + 1, "title": msg };
                        insertmongo = new roomschema_1.roomsmongo(rooms);
                        return [4 /*yield*/, insertmongo.save()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_16 = _a.sent();
                        console.log("dberror:: " + err_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.removeRoom = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, roomschema_1.roomsmongo.remove({ "id": id })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_17 = _a.sent();
                        console.log("dberror:: " + err_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    dblogic.prototype.removeChat = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chatschema_1.chatmongo.remove({ "id": id })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_18 = _a.sent();
                        console.log("dberror:: " + err_18);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return dblogic;
}());
exports.dblogic = dblogic;
