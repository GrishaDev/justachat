"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var user_class_1 = require("./user.class");
//mongoose.Promise = global.Promise;
var UsersLogic = /** @class */ (function () {
    function UsersLogic() {
    }
    UsersLogic.prototype.adduser = function (person) {
        var human = new user_class_1.User(person.id, person.name, person.pass, person.type);
        var insertmongo = new user_model_1.userModel(person);
        insertmongo.save(function (err) {
            if (err)
                console.log("ERROR: weird error with add user to db");
            // saved!
        });
    };
    return UsersLogic;
}());
exports.UsersLogic = UsersLogic;
