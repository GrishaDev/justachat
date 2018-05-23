import {logmongo} from '../schemas/logschema';
import {chatmongo} from '../schemas/chatschema';
import {roomsmongo} from '../schemas/roomschema';
import {mongo} from '../schemas/schema';
import * as chatmsgs from '../../json/chatmsgs.json';
import * as roomsjsn from '../../json/rooms.json';
import * as bcrypt from 'bcrypt';
import * as loginit from '../../json/logsinit.json';
import * as logsjson from '../../json/logs.json';
import * as userjson from '../../json/userlist.json';
import * as userinit from '../../json/users.json';

let stfu:any = (<any>chatmsgs);
let jsnrooms:any = (<any>roomsjsn);

export class dblogic
{
    public async getRooms()
    {
        (<any>roomsjsn).rooms = [];
        
        try
        {
            let obj = await roomsmongo.find({});

            for(let i=0; i<obj.length; i++)
            {            
                (<any>roomsjsn).rooms.push({id:obj[i].toObject().id,
                    title:obj[i].toObject().title
                    }); 
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }
    public async getChat()
    {
        (<any>chatmsgs).chatmsgs = [];

        try
        {
            let obj = await chatmongo.find({});
            
            var h;
            if(obj.length > 10)
                h = obj.length-10;
            else
                h = 0;

            for(let i=h; i<obj.length; i++)
            {            
                (<any>chatmsgs).chatmsgs.push({id:obj[i].toObject().id,
                    msg:obj[i].toObject().msg,
                    type:obj[i].toObject().type
                    }); 
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async login(name:string, pass:string)
    {
       try
       {
            let usr = await mongo.find({name: name});

            if(usr && usr.length)
            {
                let hash:string = bcrypt.hashSync(pass, 10);
                let res = await bcrypt.compare(pass, usr[0].toObject().pass);

                if(res)
                    return usr[0].toObject();
                else
                    return "wrong pass";       
            } 
            return "user not found";
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async register(name:string, pass:string)
    {
        try
        {
            let obj = await mongo.find({name: name});

            if(obj && obj.length)
            {
                console.log("name already in use");
                return "used";
            }
            else
            {
                return "fine";
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }
    public async addUser(maxid:number,name:string,pass:string,type:string)
    {
        try
        {
            let hash:string = bcrypt.hashSync(pass, 10);
            let person:any = {"id":maxid+1,"name":name,"pass":hash
            ,"type":type};

            let insertmongo:any = new mongo(person);
            insertmongo.save();
            return true
        }
        catch(err)
        {
            console.log("dberror:: "+err);
            return false
        }
    }

    public async edituser(id:number,name:string,pass:string,type:string)
    {
        try
        {
            let hash:string = bcrypt.hashSync(pass, 10);

            await mongo.findOneAndUpdate({id: id}, 
            {$set:{name:name,pass:hash,type:type}}, 
            {new: true});
        
            console.log("edited user "+id);    
        }
        catch(err)
        {
            console.log("ERROR #9A2F(0100011001) ? > SYSTEM :{H.PPD ID 23ACD2F? -> error");
        } 
    }

    public async removeuser(id:string)
    {
        try
        {
            await mongo.remove({"id":id});
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async getlogs()
    {
        try
        {
            let obj:any = await logmongo.find({});

            if(!obj.length)
            {
                await logmongo.create((<any>loginit).logs);
                return (<any>loginit);
            }
            else
            {
                (<any>logsjson).logs = [];

                for(let i=0; i<obj.length; i++)
                {            
                    (<any>logsjson).logs.push(
                    {id:obj[i].toObject().id,
                    time:obj[i].toObject().time,
                    log:obj[i].toObject().log,
                    type:obj[i].toObject().type
                    });
                }
                return (<any>logsjson);
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }
    
    public async jsonUsers()
    {
        try
        {
            let obj:any = await mongo.find({});

            if(!obj.length)
            {
                await mongo.create((<any>userinit).users);
                console.log("new user db");
                return (<any>userinit);
            }
            else
            {
                (<any>userjson).users = [];

                for(let i=0; i<obj.length; i++)
                {            
                    (<any>userjson).users.push(
                    {id:obj[i].toObject().id,
                    name:obj[i].toObject().name,
                    pass:obj[i].toObject().pass,
                    type:obj[i].toObject().type
                    });
                }
                return (<any>userjson);
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }
    public async usersMaxId()
    {
        try
        {
            let obj = await mongo.find({});
            let maxid:number;

            if(obj!= null)
            {
                maxid = obj[0].toObject().id;
                console.log(obj.length);

                for(let i=0; i<obj.length; i++)
                {             
                    if(obj[i].toObject().id > maxid)
                    {
                        maxid = obj[i].toObject().id;
                    }
                }
                return maxid;
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async logsMaxId()
    {
        try
        {
            let obj = await logmongo.find({});
            let maxid:number;

            if(obj!= null)
            {
                maxid = obj[0].toObject().id;
                console.log(obj.length);

                for(let i=0; i<obj.length; i++)
                {             
                    if(obj[i].toObject().id > maxid)
                    {
                        maxid = obj[i].toObject().id;
                    }
                }
                return maxid;
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async chatMaxId()
    {
        try
        {
            let obj = await chatmongo.find({});
            let maxid:number=0;

            if(obj!= null)
            {
                maxid = obj[0].toObject().id;
                console.log(obj.length);

                for(let i=0; i<obj.length; i++)
                {             
                    if(obj[i].toObject().id > maxid)
                    {
                        maxid = obj[i].toObject().id;
                    }
                }
                return maxid;
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async getChatLen()
    {
        try
        {
            let obj = await chatmongo.find({});

            if(obj!= null)
                return obj.length;
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async roomsMaxId()
    {
        try
        {
            let obj = await roomsmongo.find({});
            let maxid:number;

            if(obj!= null)
            {
                maxid = obj[0].toObject().id;
                console.log(obj.length);

                for(let i=0; i<obj.length; i++)
                {             
                    if(obj[i].toObject().id > maxid)
                    {
                        maxid = obj[i].toObject().id;
                    }
                }
                return maxid;
            }
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async addLogs(id:number,msg:string)
    {
        try
        {
            let insertmongo: any;
            let log:any;
            const date = new Date();
            log = {"id":id+1,"time":date.toString(),"log":msg
            ,"type":"normal"};

            insertmongo = new logmongo(log);
            await insertmongo.save();
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    
    public async updateChat(id:number,msg:string,typo:string)
    {
        try
        {
            let insertmongo: any;
            let chatlog:any;
            let len:number;
            let offset:number=0;

            if(id == undefined)
                id = 0;
                
            console.log(" ::::::::::::::::::::::: hello? "+id);
            chatlog = {"id":id+1,"msg":msg
            ,"type":typo};

            insertmongo = new chatmongo(chatlog);
            await insertmongo.save();

            // len= await this.getChatLen();

            if(id+1 > 15)
            {
                await this.removeChat(id-15);
            }
            // while(len - 20 > 0)
            // {
            //     console.log("========= removing message id "+(len-20));
            //     await this.removeChat(len-20);
            //     len= await this.getChatLen();
            //     offset++;
            //     console.log("==== i deleted so far "+offset+" messages");
            // }
            //await this.getChat();

          //  await this.removeChat();

        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async updateRooms(id:number,msg:string)
    {
        try
        {
            let insertmongo: any;
            let rooms:any;

            rooms = {"id":id+1,"title":msg};

            insertmongo = new roomsmongo(rooms);
            await insertmongo.save();
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async removeRoom(id:string)
    {
        try
        {
            await roomsmongo.remove({"id":id});
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }

    public async removeChat(id:number)
    {
        try
        {
            await chatmongo.remove({"id":id});
        }
        catch(err)
        {
            console.log("dberror:: "+err);
        }
    }


}