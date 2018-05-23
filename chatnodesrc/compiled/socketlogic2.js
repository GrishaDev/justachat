// import server from './logic/server'
// import mongoose = require('mongoose');
// import iosocket = require("socket.io");
// import * as httpy from 'http';
// import {logmongo} from './schemas/logschema';
// //import socketlogic from './socketlogic';
// import {apilogic} from './logic/apilogic';
// import * as Promise from 'bluebird';
// import * as configjson from '../json/config.json';
// io.on('connect', (socket: any) => 
// {
//     onconnect(socket);
//     socket.on('disconnect', function()
//     {
//         ondc(socket);
//     });
//     socket.on('chat message', function(user,msg,clr)
//     {
//         securitytest(user,clr,msg,socket);
//     });
//     socket.on('sendlogs',function(pass,msg)
//     {
//         if(pass == config.logspass)
//         {
//           submitLogs(msg);
//         }
//     });
// }); 
// function onconnect(socket:any)
// {
//     const date = new Date();
//     let time:string = date.getHours().toString() + ':'+date.getMinutes().toString();
//     let person:any = socket.handshake.query['user'];
//     let pass:any = socket.handshake.query['pass'];
//     var socketId:any = socket.id;
//     var clientIp = socket.request.connection.remoteAddress;
//     console.log(time+'||' +clientIp+' tries to connect');
//     methods.Login(person,pass)
//     .then(function(ret)
//     {
//         let o:string = nametag+person;
//         let checker:boolean = true;
//         console.log(o);
//         for(let i=0; i<usersonline.length;i++)
//         {
//             console.log(usersonline);
//             if(o == usersonline[i])
//             {
//                 console.log("already logged in");
//                 person = "user"+(Math.floor(Math.random() * 400) + 1).toString();
//                 let type = "hobo"
//                 usersonline.push(person);
//                 console.log(time+'||' +person+' connected. ('+clientIp+')');
//                 allClients.push(socket);
//                 io.emit('newuser',usersonline,type);
//                 checker=false;
//                 break;
//             }
//         }
//         if(checker)
//         {
//             usersonline.push(o);
//             console.log(time+'||' +o+' connected. ('+clientIp+')');
//             allClients.push(socket);
//             io.emit('newuser',usersonline,ret[0].toObject().type); 
//         }
//     })
//     .catch(function(err)
//     {
//         console.log(err);
//         if(err == "wrong pass")
//         {
//             person = "user"+(Math.floor(Math.random() * 400) + 1).toString();
//         }
//         for(let i=0; i<usersonline.length;i++)
//         {   
//             if(person == usersonline[i])
//             {
//                person = "user"+(Math.floor(Math.random() * 400) + 1).toString();
//             }
//         }
//         let type = "hobo"
//         usersonline.push(person);
//         console.log(time+'||' +person+' connected. ('+clientIp+')');
//         allClients.push(socket);
//         io.emit('newuser',usersonline,type);
//     });
// }
// function securitytest(user,clr,msg,socket)
// {
//     let userindex:number = allClients.indexOf(socket);
//     let human:string = usersonline[userindex];
//     if(human != user)
//     {
//        ban(socket);
//     }
//     else
//     {
//         const date = new Date();
//         let time:string = date.getHours().toString() + ':'+date.getMinutes().toString();
//         console.log(time+'||' +user+ msg);
//         io.emit('chat message', user,msg,clr);
//     }
// }
// function ondc(socket:any)
// {
//     if(dc)
//     {
//         let userindex:number = allClients.indexOf(socket);
//         let human:string = usersonline[userindex];
//         allClients.splice(userindex, 1);
//         usersonline.splice(userindex, 1);
//         io.emit('removeuser',usersonline,human);
//         console.log(human+' disconnected');
//     }
// }
// function ban(socket:any)
// {
//     dc=false;
//     let userindex:number = allClients.indexOf(socket);
//     let human:string = usersonline[userindex];
//     socket.emit('reload');
//     /* allClients.splice(userindex, 1);
//     usersonline.splice(userindex, 1); */
//     io.emit('kick',usersonline,human);
//     console.log(human+' kicked');
//     dc=true;
// }
// function submitLogs(msg)
// {
//     let insertmongo: any;
//     let maxid:number=0;
//     let log:any;
//     console.log(logmongo.length);
//     logmongo.find({}, function(err, obj)
//     {
//         maxid = obj[0].toObject().id;
//         console.log(obj.length);
//         for(let i=0; i<obj.length; i++)
//         {             
//             if(obj[i].toObject().id > maxid)
//             {
//                 maxid = obj[i].toObject().id;
//             }
//         }
//         const date = new Date();
//         log = {"id":maxid+1,"time":date.toString(),"log":msg
//         ,"type":"normal"};
//         insertmongo = new logmongo(log);
//         insertmongo.save(function (err) 
//         {
//             if (err) console.log("ERROR: weird error with add user to db : "+err);
//         });
//     });
// } 
