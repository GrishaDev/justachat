"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var logschema_1 = require("./logschema");
var path = require("path");
var userlist = require("../json/users.json");
var userjson = require("../json/userlist.json");
var logsjson = require("../json/logs.json");
var Promise = require("bluebird");
//let userslogic:UsersLogic = new UsersLogic();
var i = 0;
var user;
var apilogic = /** @class */ (function () {
    function apilogic() {
    }
    apilogic.prototype.hello = function (res) {
        res.sendFile(path.join(__dirname, '../client/chat.html'));
    };
    apilogic.prototype.Login = function (name, pass) {
        return new Promise(function (resolve, reject) {
            //resolve(true);
            //reject({"code": 121, "Error": "database filed"});
            schema_1.mongo.find({ name: name, pass: pass }, function (err, usr) {
                /*for(let i=0; i<obj.length; i++)
                {
                    if(obj[i].toObject().name == name
                    && obj[i].toObject().pass == pass)
                    {
                        console.log("login successful");
                        this.checker = true;
                        resolve(true);
                        break;
                    }
                }*/
                if (usr && usr.length) {
                    resolve(usr);
                }
                else {
                    reject("user not found");
                }
                //reject("user not found");
            });
        });
    };
    apilogic.prototype.Login1 = function (name, pass) {
        console.log("LOGIN");
        this.checker = false;
        schema_1.mongo.find({}, function (err, obj) {
            for (var i_1 = 0; i_1 < obj.length; i_1++) {
                if (obj[i_1].toObject().name == name
                    && obj[i_1].toObject().pass == pass) {
                    console.log("login successful");
                    this.checker = true;
                    Promise.resolve(true);
                    break;
                }
            }
        });
    };
    apilogic.prototype.Register = function (name, pass) {
        schema_1.mongo.find({}, function (err, obj) {
            for (var i_2 = 0; i_2 < obj.length; i_2++) {
                if (obj[i_2].toObject().name == name) {
                    console.log("name already in use");
                    break;
                }
                else {
                    console.log("registered!");
                    break;
                }
            }
        });
    };
    apilogic.prototype.getUsers = function (res) {
        //  res.json(userlist);
        if (schema_1.mongo.length == 0) {
            schema_1.mongo.create(userlist.users, function (err, results) {
                console.log("inserted into db from json");
            });
        }
        schema_1.mongo.find({}, function (err, obj) {
            console.log("banana");
            userjson.users = [];
            for (var i_3 = 0; i_3 < obj.length; i_3++) {
                console.log(obj[i_3].toObject().name);
                userjson.users.push({ id: obj[i_3].toObject().id,
                    name: obj[i_3].toObject().name,
                    pass: obj[i_3].toObject().pass,
                    type: obj[i_3].toObject().type
                });
            }
            res.json(userjson);
        });
        console.log("printed user list");
    };
    apilogic.prototype.editUser = function (idd, name, pass, type) {
        var id = +idd;
        if (!isNaN(id)) {
            // (<any>userlist).users[id] = {name:req.params.name,pass:req.params.pass,type:req.params.type};
            schema_1.mongo.findOneAndUpdate({ id: id }, { $set: { name: name, pass: pass, type: type } }, { new: true }, function (err, doc) {
                if (err) {
                    console.log("ERROR #9A2F(0100011001) ? > SYSTEM :{H.PPD ID 23ACD2F? -> error");
                }
                console.log("edited user " + id);
            });
        }
        else {
            console.log("ERROR: didn't input valid id");
        }
    };
    apilogic.prototype.addUser = function (name, pass, type) {
        var insertmongo;
        var maxid;
        var person;
        schema_1.mongo.find({}, function (err, obj) {
            maxid = obj[0].toObject().id;
            console.log(obj.length);
            for (var i_4 = 0; i_4 < obj.length; i_4++) {
                if (obj[i_4].toObject().id > maxid) {
                    maxid = obj[i_4].toObject().id;
                }
            }
            person = { "id": maxid + 1, "name": name, "pass": pass,
                "type": type };
            insertmongo = new schema_1.mongo(person);
            insertmongo.save(function (err) {
                if (err)
                    console.log("ERROR: weird error with add user to db");
                // saved!
            });
        });
    };
    apilogic.prototype.removeUser = function (id) {
        var a = id;
        //(<any>userlist).users.splice(a,1);
        console.log("removed user " + a);
        //mongo.findOneAndRemove({id:a});
        schema_1.mongo.remove({ "id": a }, function (err) {
            if (err)
                throw err;
            console.log("removed user from db");
        });
    };
    apilogic.prototype.getAllLogs = function (res) {
        if (schema_1.mongo.length == 0) {
            console.log("empty");
        }
        logschema_1.logmongo.find({}, function (err, obj) {
            logsjson.logs = [];
            for (var i_5 = 0; i_5 < obj.length; i_5++) {
                // console.log(obj[i].toObject().name);
                logsjson.logs.push({ id: obj[i_5].toObject().id,
                    time: obj[i_5].toObject().time,
                    log: obj[i_5].toObject().log,
                    type: obj[i_5].toObject().type
                });
            }
            res.json(logsjson);
        });
        console.log("printed all logs");
    };
    apilogic.prototype.help = function (res) {
        res.sendFile(path.join(__dirname, '../client/help.txt'));
    };
    return apilogic;
}());
exports.apilogic = apilogic;
