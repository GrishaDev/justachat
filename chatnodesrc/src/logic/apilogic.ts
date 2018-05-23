import {mongo} from '../schemas/schema';
import {logmongo} from '../schemas/logschema';
import {chatmongo} from '../schemas/chatschema';
import * as path from 'path'
import * as userlist from '../../json/users.json';
import * as userjson from '../../json/userlist.json';
import * as logsjson from '../../json/logs.json';
import * as chatmsgs from '../../json/chatmsgs.json';
import * as roomsjsn from '../../json/rooms.json';
import * as loginit from '../../json/logsinit.json';
import * as Promise2 from 'bluebird';
import * as bcrypt from 'bcrypt';
import * as session from 'express-session';
import * as online from '../../json/online.json';
import * as configjson from '../../json/config.json';
import {dblogic} from './dblogic'


let config:any = (<any>configjson);
let usersonline:any = (<any>online);
let jsnrooms:any = (<any>roomsjsn);
let stfu:any = (<any>chatmsgs);
let dbmethods:dblogic =  new dblogic();

//let userslogic:UsersLogic = new UsersLogic();
let i = 0;
let user:string;
//let usersonline:string[] = [];

export class apilogic
{
    checker:boolean;
    //usersonline:string[] = [];

    public async delroom(res,id)
    {
        await dbmethods.removeRoom(id.toString());

        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({ok:true}));
        res.end();
    }
    public async newroom(title,res:any)
    {
        let maxid:number = 0;
        maxid = await dbmethods.roomsMaxId();

        await dbmethods.updateRooms(maxid,title);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({ok:true}));
        res.end();
    }
    public async makeRooms(res:any,req:any)
    {
        console.log("auth for /rooms, sending init rooms..")
        let rooms:number[] = [];
        let titles:string[] = [];
        let ids:string[] = [];

        await dbmethods.getRooms();
        if(jsnrooms.rooms.length === 0 || jsnrooms.rooms.length === undefined)
        {
            await dbmethods.updateRooms(0,"public");
            await dbmethods.getRooms();
        }

        for(let i=0; i<jsnrooms.rooms.length;i++)
        {
            rooms.push(this.getRoomCount(i));
            titles.push(jsnrooms.rooms[i].title);
            ids.push(jsnrooms.rooms[i].id);
        }
        // console.log(jsnrooms[0].rooms.title);
        // console.log(jsnrooms[0].title);
        // console.log(jsnrooms.rooms[0]);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({ok:true,rooms:rooms,titles:titles,
        ids:ids,user:req.session.user,type:req.session.type}));
        res.end();
    }

    public getRoomCount(index:number)
    {
        let x=0;

        for(let i=0; i<usersonline.length;i++)
        {
            if(usersonline[i].room == index)
                x++;
        }
        return x;
    }
    public chosed(res:any, req:any,chosed,room)
    {
        req.session.chosed = chosed;
        req.session.room = room;

        console.log(req.session);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({user:req.session.user,ok:true}));
        res.end();
    }
    public async hello(res:any,req:any)
    {
        usersonline = (<any>online);
        let checker:boolean = true;

        var _user = {user: req.session.user,type:req.session.type,
                    logged:req.session.logged,wrong:req.session.wrong,room:req.session.room};
        
        for(let i=0; i<usersonline.length;i++)
        {
            if(req.session.user == usersonline[i].user)
            {
                console.log(checker);
                checker=false;
            }
        }

        if(checker)
        {
            await dbmethods.getChat();
            console.log(_user);
            console.log(chatmsgs);


            console.log("----------------- AM I HERE  ------------ ");
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({ok:true,user:req.session.user,
            type:req.session.type,chatmsgs:chatmsgs}));
            res.end();
           // res.setHeader("xxx-user", JSON.stringify(_user));
          //  res.setHeader("xxx-chatmsgs", JSON.stringify(chatmsgs));
          //  res.sendFile(path.join(__dirname , '../../client/chat.html'));
        }
        else
        {
            console.log(checker);
            res.sendFile(path.join(__dirname , '../../client/dont.html'));
        }     
    }

    public Loginpage(res:any)
    {
       // res.sendFile(path.join(__dirname , '../../client/login.html'));
       res.sendFile(path.join(__dirname , '../../client/login/index.html'));
    }

    public async LoginCheck(res:any, req:any,user:string,pass:string)
    {
        let result:any =  await dbmethods.login(user,pass);

        if(result.type)
        {
            let o:string = '[halva]'+user;
            let checker:boolean = true;

            for(let i=0; i<usersonline.length;i++)
            {
                if(o == usersonline[i].user)
                {
                    console.log("already logged in");
    
                    req.session.logged = true;
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({user:req.session.user,wrong:req.session.wrong,logged:req.session.logged}));
                    res.end();
                    checker=false;
                }
            }
            if(checker)
            {
                req.session.user = o;
                req.session.pass = pass;
                req.session.type = result.type;
                req.session.logged = false;
                req.session.wrong = false;
    
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify({user:req.session.user,wrong:req.session.wrong,logged:req.session.logged}));
                res.end();
            }
        }
        else
        {
            console.log(result);
            let wa:boolean = true;

            if(pass == "magicalnothingwaw23awaw")
            {
            for(let i=0; i<usersonline.length;i++)
            {   
                if(user == usersonline[i])
                {
                    console.log("(hobo)already logged in");
                    req.session.logged = true;
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({user:req.session.user,wrong:req.session.wrong,logged:req.session.logged})); // You Can Call Response.write Infinite Times BEFORE response.end
                    res.end();
                    wa = false;
                }
            }
            if(wa)
            {
                req.session.user = user;
                req.session.type = "hobo";
                req.session.logged = false;
                req.session.wrong = false;
    
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify({user:req.session.user,wrong:req.session.wrong})); // You Can Call Response.write Infinite Times BEFORE response.end
                res.end();
            }
            }
            else
            {
            req.session.wrong = true;
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({user:req.session.user,wrong:req.session.wrong})); // You Can Call Response.write Infinite Times BEFORE response.end
            res.end();
            }
        }
    }

    public async getUsers(res:any)
    {
        let a:any;
        a  = await dbmethods.jsonUsers();
        res.json(a);
        console.log("printed user list");
    }

    public async editUser(idd:string, name:string, pass:string, type:string)
    {
        let id:number = +idd;
        if(!isNaN(id))
        {
           await dbmethods.edituser(id,name,pass,type);
        }
        else
        {
            console.log("ERROR: didn't input valid id");
        }
    }

    public async addUser(res:any,name:string, pass:string, type:string)
    {
        let maxid:number;
        let result:any;

        if(type == "uni")
            maxid = 22222;
        else
            maxid = await dbmethods.usersMaxId();

        result = await dbmethods.register(name,pass);
        
        if(result === "fine")
        {
            let worked:boolean = await dbmethods.addUser(maxid,name,pass,type);
            if(worked)
            {
                console.log("user added succesfuly");
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify({status:true})); // You Can Call Response.write Infinite Times BEFORE response.end
                res.end();
            }
        }
        else if(result === "used")
        {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({status:false})); // You Can Call Response.write Infinite Times BEFORE response.end
            res.end();
        }
    }

    public async removeUser(id:string)
    {
        let a:string = id;
        await dbmethods.removeuser(a);
        console.log("removed user "+a);
    } 

    public async getAllLogs(res:any)
    {  
        let a:any;
        a  = await dbmethods.getlogs();
        res.json(a);
        console.log("printed all logs");
    }

    public help(res:any)
    {
        res.sendFile(path.join(__dirname , '../../client/help.txt'));
    } 
}


