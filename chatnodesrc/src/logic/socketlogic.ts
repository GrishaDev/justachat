import * as online from '../../json/online.json';
import {dblogic} from './dblogic'

//let config:any = (<any>configjson);
let usersonline:any = (<any>online);
let bgcolor:string= "#ffffff";
let dbmethods:dblogic =  new dblogic();

export class socketlogic
{
    io:any;
    dc = true;

    constructor(io)
    {
        this.io = io;

        io.on('connect', (socket: any) => 
        {
            this.onconnect(socket);

            socket.on('disconnect', ()=>
            {
                this.ondc(socket);
            });

            socket.on('chat message', (user,msg,type)=>
            {
                this.securitytest(user,msg,type,socket);
            });

            socket.on('sendlogs',function(pass,msg)
            {
                if(pass == "88")
                {
                    this.submitLogs(msg);
                }
            });
        }); 
    }

    public onconnect(socket:any)
    {
        const date = new Date();
        let time:string = date.getHours().toString() + ':'+date.getMinutes().toString();
        let person:any = socket.handshake.query['user'];
        let type:any = socket.handshake.query['type'];
        let room:any = socket.handshake.query['room'];
        let clientIp:any = socket.request.connection.remoteAddress;

        socket.join(room);
        console.log(" i will join room "+room);

        console.log(time+'||' +clientIp+' tries to connect');
        console.log(time+'||' +person+' connected. ('+clientIp+')');
        (<any>online).push({"user":person,"type":type,"socket":socket,"room":room});
        var a = this.getData("roomusers",room);
        var b = this.getData("roomtypes",room);
        console.log(a);
        console.log(b);
        //console.log(this.getData("types",room));
        this.io.to(room).emit('newuser',this.getData("roomusers",room),this.getData("roomtypes",room),bgcolor);
    }

    public ondc(socket:any)
    {
        if(this.dc)
        {
            let userindex:number = this.getData("sockets",-1).indexOf(socket);
            let human:string = usersonline[userindex].user;
            let room:any = usersonline[userindex].room;

            usersonline.splice(userindex, 1);

            this.io.to(room).emit('removeuser',this.getData("users",-1),human);
            console.log(human+' disconnected');
        }
    }

    public securitytest(user:string,msg:string,type:string,socket:any)
    {
        let userindex:number = this.getData("sockets",-1).indexOf(socket);
        let human:string = usersonline[userindex].user;
        let typo:string = usersonline[userindex].type;

        if(human != user || typo !=type) // cheat check
        {
            this.ban(socket);
        }
        else
        {
            let command:string;
            let humanoid:string;
            let a:string;
    
            const date = new Date();
            let time:string = date.getHours().toString() + ':'+date.getMinutes().toString();
            console.log(time+'||' +user+ msg);
    
            a = msg.slice(2,msg.length);
            command = a.substr(0,a.indexOf(' '));
            humanoid = a.substr(a.indexOf(' ')+1);
    
            command = command.toLowerCase();
            this.commander(command,humanoid,typo,user,socket,msg);
        }
    }

    public async commander(command:string, humanoid:string,typo:any,user:string,socket:any,msg:string)
    {
        if(command == '/kick')
        {
            for(let i=0; i<usersonline.length;i++)
            {   
                if(humanoid == usersonline[i].user)
                {
                    console.log(typo);
                    console.log(usersonline[i].type);

                    if(typo=="dev" || typo=="admin")
                    {
                        let userindex:number = this.getData("users",-1).indexOf(humanoid);
                        let humanoidsocket:any = usersonline[userindex].socket;
                        this.ban(humanoidsocket);
                        console.log(humanoid+" has been kicked by "+user);
                    }
                    else
                    {
                        this.ban(socket);
                        console.log("someone tried to cheat abit");
                    }
                }
            }
        }
        else if(command == '/color')
        {
            if(typo=="dev" || typo=="admin" || typo=="user")
            {
                if(humanoid.length == 7)
                {
                    bgcolor=humanoid;
                    this.io.emit('changebg',user,typo,humanoid);
                    console.log(user+" has changed background color to "+humanoid);
                }
            }
        }
        else
        {
            let maxid:number=0;
            maxid = await dbmethods.chatMaxId();
            await dbmethods.updateChat(maxid,user+msg,typo);
           // updateChatDb(user+msg,typo);
            let userindex:number = this.getData("sockets",-1).indexOf(socket);
            let room:any = usersonline[userindex].room;
            this.io.to(room).emit('chat message', user,msg,typo);
        }
    }

    public ban(socket:any)
    {
        this.dc=false;
        let userindex:number = this.getData("sockets",-1).indexOf(socket);
        let human:string = usersonline[userindex].user;

        socket.emit('reload');
        let room:any = usersonline[userindex].room;
        this.io.to(room).emit('kick',this.getData("users",-1),human);
        console.log(human+' kicked');
        this.dc=true;
    }

    public getData(type:string,roomindex:number)
    {
        let data:string[] = [];

        for(let i=0; i<usersonline.length;i++)
        {
            if(type === "users")
                data.push(usersonline[i].user);
            else if(type === "types")
                data.push(usersonline[i].type);
            else if(type === "rooms")
                data.push(usersonline[i].room);
            else if(type === "roomusers")
            {
                if(usersonline[i].room === roomindex)
                    data.push(usersonline[i].user);
            }
            else if(type === "roomtypes")
            {
                if(usersonline[i].room === roomindex)
                    data.push(usersonline[i].type);
            }
            else
                data.push(usersonline[i].socket);
        }
       // console.log("the data i am sending is.... "+data);
        return data;
    }

    public async submitLogs(msg:string)
    {
        let maxid:number=0;
        maxid = await dbmethods.logsMaxId();
        await dbmethods.addLogs(maxid,msg);
    }
}