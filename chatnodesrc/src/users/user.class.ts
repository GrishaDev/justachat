import { userModel } from './user.model';
import { UserInt } from './user.interface';

export class User implements Partial<UserInt> 
{
    id:   Number;
    name: String;
    pass: String;
    type: String;

  constructor(id: number, name: string, pass: string,type: string) 
  {
      this.id = id;
      this.name = name;
      this.pass = pass;
      this.type = type;
  }
}
