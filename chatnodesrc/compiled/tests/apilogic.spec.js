"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apilogic_1 = require("../logic/apilogic");
var chai_1 = require("chai");
var chey = require("chai");
chey.use(require('chai-http'));
var server_1 = require("../logic/server");
var mongoose = require("mongoose");
var schema_1 = require("../schemas/schema");
var should = chey.should();
var methods = new apilogic_1.apilogic();
/* const testSchema = new Schema({
  name: { type: String, required: true }
});

//Create a new collection called 'Name'
const Name = mongoose.model('Name', testSchema);
 */
/*  describe('login function', () => {
    it('checks if user exists in db', () => {
       const result = methods.Login("bob","ha");
       expect(result).to.equal('Hello World!');
    });
  });
 */
describe('API check', function () {
    //this.timeout(15000);
    it('load chat page', function (done) {
        chey.request(server_1.default)
            .get('/')
            .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
    it('load API help', function (done) {
        chey.request(server_1.default)
            .get('/apihelp')
            .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
    before(function (done) {
        mongoose.connect('mongodb://admin:admin@ds119028.mlab.com:19028/halva');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('connected to db');
            done();
        });
    });
    it('print users from db', function (done) {
        //setTimeout(done,15000);
        // setTimeout(done,10000);
        chey.request(server_1.default)
            .get('/users/waw')
            .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
    it('print logs from db', function (done) {
        //setTimeout(done,15000);
        // setTimeout(done,10000);
        chey.request(server_1.default)
            .get('/logs')
            .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
    it('add user to db', function (done) {
        var insertmongo;
        var person;
        person = { "id": 22223, "name": "1", "pass": "1", "type": "uni" };
        insertmongo = new schema_1.mongo(person);
        insertmongo.save(function (err) {
            if (err)
                console.log("ERROR: weird error with add user to db");
            // saved!
            chai_1.expect(err).to.be.null;
            done();
        });
    });
    it('edit user from db', function (done) {
        schema_1.mongo.findOneAndUpdate({ id: "22223" }, { $set: { name: "2", pass: "2", type: "uni2" } }, { new: true }, function (err, doc) {
            if (err) {
                console.log("ERROR #9A2F(0100011001) ? > SYSTEM :{H.PPD ID 23ACD2F? -> error");
            }
            chai_1.expect(err).to.be.null;
            done();
        });
    });
    it('remove user from db', function (done) {
        schema_1.mongo.remove({ id: "22223" }, function (err) {
            if (err)
                throw err;
            chai_1.expect(err).to.be.null;
            done();
        });
    });
    //   after((done)=>
    //   {
    //     mongoose.connection.db.dropDatabase(()=>
    //     {
    //        mongoose.connection.close(done);
    //     });
    //   });
});
/*   describe('Hello function', () => {
    it('should return hello world', () => {
      const result = hello();
      expect(result).to.equal('Hello World!');
    });
  }); */ 
