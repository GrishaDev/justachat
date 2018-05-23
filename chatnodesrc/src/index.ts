import server from './logic/server'
import mongoose = require('mongoose');
import iosocket = require("socket.io");
import * as httpy from 'http';
import {logmongo} from './schemas/logschema';
import {chatmongo} from './schemas/chatschema';
import {apilogic} from './logic/apilogic';
import {socketlogic} from './logic/socketlogic';
import * as Promise from 'bluebird';
import * as configjson from '../json/config.json';
import * as online from '../json/online.json';

let config:any = (<any>configjson);
let usersonline:any = (<any>online);

const port = process.env.PORT || 3200;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds119028.mlab.com:19028/halva');

let http:any = new httpy.Server(server);

http.listen(port, (err:any) => 
{
    if(err) 
    {
      return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});

let io:any;
io = iosocket(http);
let socketserv:socketlogic = new socketlogic(io);
