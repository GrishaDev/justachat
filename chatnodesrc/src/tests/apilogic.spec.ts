import {apilogic} from '../logic/apilogic';
import {expect} from 'chai';
import * as chey from 'chai';
chey.use(require('chai-http'));
import server from '../logic/server'
import mongoose = require('mongoose');
import {mongo} from '../schemas/schema';

let should = chey.should();
let methods:apilogic = new apilogic();

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
describe('API check', ()=> 
{
  //this.timeout(15000);


  it('load chat page', (done)=>
  {
      chey.request(server)
      .get('/')
      .end((err,res)=>
      {
          res.should.have.status(200);
          done();
      })
  });
  it('load API help', (done)=>
  {
      chey.request(server)
      .get('/apihelp')
      .end((err,res)=>
      {
          res.should.have.status(200);
          done();
      })
  });

  before(function (done) {
    mongoose.connect('mongodb://admin:admin@ds119028.mlab.com:19028/halva');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('connected to db');
      done();
    });
  });

  it('print users from db', (done)=>
  {
    //setTimeout(done,15000);
     // setTimeout(done,10000);
      chey.request(server)
      .get('/users/waw')
      .end((err,res)=>
      {
          res.should.have.status(200);
          done();
      })
  });

  it('print logs from db', (done)=>
  {
    //setTimeout(done,15000);
     // setTimeout(done,10000);
      chey.request(server)
      .get('/logs')
      .end((err,res)=>
      {
          res.should.have.status(200);
          done();
      })
  });

  it('add user to db', (done)=>
  {
      let insertmongo: any;
      let person:any;

      person = {"id":22223,"name":"1","pass":"1","type":"uni"};

      insertmongo = new mongo(person);
      insertmongo.save(function (err) 
      {
        if (err) console.log("ERROR: weird error with add user to db");
        // saved!
        expect(err).to.be.null;
        done();
      });
  });

  it('edit user from db', (done)=>
  {
    mongo.findOneAndUpdate({id: "22223"}, 
    {$set:{name:"2",pass:"2",type:"uni2"}}, 
    {new: true}, function(err, doc)
    {
        if(err)
        {
            console.log("ERROR #9A2F(0100011001) ? > SYSTEM :{H.PPD ID 23ACD2F? -> error");
        }
        expect(err).to.be.null;
        done();
    });
  });

  it('remove user from db', (done)=>
  {
     mongo.remove({id:"22223"},function(err) 
     {
         if (err) throw err;

         expect(err).to.be.null;
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