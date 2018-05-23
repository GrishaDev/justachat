import { Router, Request, Response } from 'express';
import {apilogic} from './apilogic';
import * as configjson from '../../json/config.json';
import * as session from 'express-session';
import * as path from 'path'

let config:any = (<any>configjson);
const router:Router = Router();
let methods:apilogic = new apilogic();
let hash:string = ''

router.get(hash+'/chat', (req:Request, res:Response) => 
{
    if(!req.session.user)
    {
        res.redirect('/');
    } 
    else 
    {
        if(req.session.chosed)
           // methods.hello(res,req);
           console.log("nothing hAHA");
        else
            res.redirect('/#/rooms');
    }
})
router.get(hash+'/rooms', (req:Request, res:Response) => 
{
    if(!req.session.user)
    {
        res.redirect('/');
    } 
    else if(req.session.chosed)
    {
       // methods.hello(res,req);
       console.log('o');
    }
    else
    {
        methods.makeRooms(res,req);
    }
})
router.get('/', (req:Request, res:Response) => 
{
    if(req.session.user)
    {
        res.redirect(hash+'/rooms');
    }
    else
    {
        methods.Loginpage(res);
    }
});

router.get(hash+'/logout', (req:Request, res:Response) => 
{
    req.session.destroy((err)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    }); 
});

router.post('/loginsubmit', (req:Request, res:Response) => 
{
    //console.log("AM I HERE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    var user = req.body.user;
    var pass = req.body.pass;
   // console.log(user);
    methods.LoginCheck(res,req,user,pass);
  //  req.session.user = user;
   // req.session.pass = pass;
    
    
    //check in database
    //if is correct = add to session object with user and password and type + send true
    //if is not correct = send false
    //if is temp user = add to session ... + send true

   // return res.json({login: true});//redirect('/chat');
    //console.log("n");
   // console.log(req.body.jsn.pass);
})

router.post('/accsubmit', (req:Request, res:Response) => 
{
    var user = req.body.user;
    var pass = req.body.pass;
    methods.addUser(res,user,pass,"user");
})

router.post('/newroom', (req:Request, res:Response) => 
{
    console.log("new room..");
    var title = req.body.name;
    methods.newroom(title,res);
})

router.post('/chatenter', (req:Request, res:Response) => 
{
    console.log("chosed room..");
    var room = req.body.room;
    var chosed = req.body.chosed;
    console.log(room,chosed);
    methods.chosed(res,req,chosed,room);
})

router.post('/delroom', (req:Request, res:Response) => 
{
    console.log("deleting room..");
    var room = req.body.room;
    var id = req.body.id;
    methods.delroom(res,id);
})

router.get('/getuser', (req:Request, res:Response) => 
{
    methods.hello(res,req);
});

router.get('/users/:passe', (req:Request, res:Response) => 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.params.passe == config.apipass)
    methods.getUsers(res)
})

router.get('/logs', (req:Request, res:Response) => 
{
    methods.getAllLogs(res)
})

router.get('/apihelp', (req:Request, res:Response) => 
{
    methods.help(res);
})
// router.get('/login/:name/:pass', (req:Request, res:Response) => 
// {
//     methods.Login(req.params.name,req.params.pass);
// })

// router.get('/register/:name/:pass', (req:Request, res:Response) => 
// {
//     methods.Register(req.params.name,req.params.pass)
// })

router.get('/edit/:usernum/:name/:pass/:type/:passe', (req:Request, res:Response) => 
{
    if(req.params.passe == config.apipass)
    methods.editUser(req.params.usernum,req.params.name,req.params.pass,req.params.type);
})

router.get('/adduser/:name/:pass/:type/:passe', (req:Request, res:Response) => 
{
    if(req.params.passe == config.apipass)
    methods.addUser(res,req.params.name,req.params.pass,req.params.type);
})

router.get('/removeuser/:usernum/:passe', (req:Request, res:Response) => 
{
    if(req.params.passe == config.apipass)
    methods.removeUser(req.params.usernum);
})

export const apirouter: Router = router;
