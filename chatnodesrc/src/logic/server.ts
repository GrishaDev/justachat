import * as express from 'express'
import * as path from 'path'
import {apirouter} from './router';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

const server = express();

server.set('view engine','ejs');
server.use('/', express.static('client'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session(
{
    secret: "waw",
    resave: true,
    saveUninitialized: true
}));

server.use('/',apirouter);

export default server;