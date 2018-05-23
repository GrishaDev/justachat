/* import iosocket = require("socket.io");
import * as httpy from 'http';
import server from './server'
import {logmongo} from './logschema';

class socketlogic
{
     http:any;
     io:any;
     connected:number;
     usersonline:string[];
     allClients:any[];

    constructor()
    {
        this.http = new httpy.Server(server);
        this.io = iosocket(this.http);
    
        this.connected = 0;
        this.usersonline = [];
        this.allClients = [];
    }

    run()
    {
        this.io.on('connect', (socket: any) =>
        {
            console.log('Connected client');
            this.usersonline.push(socket.handshake.query['user']);
            console.log(this.usersonline);
    
            this.allClients.push(socket);
    
    
            this.io.emit('newuser',this.usersonline);
    
            
            socket.on('disconnect', function()
            {
                let userindex:number = this.allClients.indexOf(socket);
                let human:string = this.usersonline[userindex];
    
                this.allClients.splice(userindex, 1);
                this.usersonline.splice(userindex, 1);
    
                this.io.emit('removeuser',this.usersonline,human);
                console.log('user disconnected');
            });
    
            socket.on('chat message', function(msg)
            {
                console.log('message: ' + msg);
                this.io.emit('chat message', msg);
            });
    
            socket.on('sendlogs',function(msg)
            {
                this.submitLogs(msg);
            });
    
        });
    }
        
    
    submitLogs(msg)
    {
        let insertmongo: any;
        let maxid:number=0;
        let log:any;

        console.log(logmongo.length);

        logmongo.find({}, function(err, obj)
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

            const date = new Date();
            log = {"id":maxid+1,"time":date.toString(),"log":msg
            ,"type":"normal"};

            insertmongo = new logmongo(log);
            insertmongo.save(function (err) {
                if (err) console.log("ERROR: weird error with add user to db : "+err);
                // saved!
            });
        });
    }
}
export default socketlogic; */ 
