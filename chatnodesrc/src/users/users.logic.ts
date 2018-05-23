import { userModel } from './user.model';
import { UserInt } from './user.interface';
import mongoose = require('mongoose');
import { User } from './user.class';

//mongoose.Promise = global.Promise;

export class UsersLogic
{
   public adduser(person:any)
   {
      let human:User = new User(person.id,person.name,person.pass,person.type);

      let insertmongo = new userModel(person);
      insertmongo.save(function (err) {
          if (err) console.log("ERROR: weird error with add user to db");
          // saved!
      });

   }
}