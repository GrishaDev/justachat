import { Component, OnInit,HostListener } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit 
{
  user:string = "noone";
  type:string = "?"
  roomnum:string = "-1";

  first:boolean=true;
  socket:any;
  msg:string;
  showv:boolean=false;
  msgs:string[] = [];
  usermsg:string[] = [];
  allmessages:string[] = [];
  allowshow:boolean=false;
  curuser:string = "Tester: "
  online:string = "-1";
  users:string = "none";
  color:string ="black";
  yourcolor:string = "black";
  chatmsgs:any;

  constructor(private route: ActivatedRoute,private http: HttpClient) 
  {
    this.getUser();
  }

  async socketInit()
  {
    await this.route
    .queryParams
    .subscribe(params => {
        this.roomnum = params['room'];
    });

    this.usermsg.push('');
    this.msgs.push("Welcome to room "+this.roomnum);

    this.socket = io({query: "user="+this.user+"&type="+this.type+"&room="+this.roomnum});
    var it = this;

    this.socket.on('chat message', function(user,msg,type)
    {
      it.allmessages.push(user+msg);
      it.usertype(type);
      it.usermsg.push(user);
      it.msgs.push(msg);

      var chat = document.getElementById("content");

      setTimeout(function() {
      chat.scrollTop = chat.scrollHeight;
      it.allowshow=true;
      },10);
    });

    this.socket.on('newuser', function(msg,type,bgclr)
    {
      it.usertype(type.length-1)
      
      if(it.first)
      {
        it.yourcolor= it.color;
        it.updatechat();
      }

      it.online = msg.length;
      it.users = msg.toString();

      it.usermsg.push(msg[msg.length-1]+" joined the room")
      it.msgs.push('');
      it.first=false;

      var chat = document.getElementById("content");

      setTimeout(function() {
      chat.scrollTop = chat.scrollHeight;
      it.allowshow=true;
      },10);
    });

    this.socket.on('removeuser', function(users,human)
    {
      it.online=users.length;
      it.users=users.toString();

      it.color = "Gray";
      it.usermsg.push(human + " left the room");
      it.msgs.push('');

      var chat = document.getElementById("content");

      setTimeout(function() {
      chat.scrollTop = chat.scrollHeight;
      it.allowshow=true;
      },10);
    });

    this.socket.on('kick', function(users,human)
    {
      it.online=users.length;
      it.users=users.toString();

      it.color = "Gray";
      it.usermsg.push(human + " was auto kicked by halvajs system.");
      it.msgs.push('');

      var chat = document.getElementById("content");

      setTimeout(function() {
      chat.scrollTop = chat.scrollHeight;
      it.allowshow=true;
      },10);
    });
    this.socket.on('reload', function()
    {
        window.location.href = '/logout';
    });

    this.socket.on('changebg',function(user,type,bg)
    {
      it.allmessages.push(user+" has changed background color to "+bg);

      it.usertype(type);
      it.usermsg.push(user);
      it.msgs.push(" has changed background color to "+bg);
      
      var chat = document.getElementById("content");
      chat.style.backgroundColor = bg;

      setTimeout(function() {
      chat.scrollTop = chat.scrollHeight;
      it.allowshow=true;
      },10);
    });
  }
  getUser()
  {
    var it = this;
    const req = this.http.get('/getuser', {
    })
    .subscribe(
      function(res:any)
      {
        console.log(res);
        if(res.ok)
        {
            it.user = res.user;
            it.type = res.type;
            it.chatmsgs = res.chatmsgs.chatmsgs;

            
            // console.log("============ cancer =============");
            // console.log(res.chatmsgs);
            console.log(res.chatmsgs.chatmsgs);
            // console.log(JSON.parse(res.chatmsgs));
            // console.log(JSON.parse(res.chatmsgs.chatmsgs));
            // console.log(JSON.stringify(res.chatmsgs));
            // console.log(JSON.stringify(res.chatmsgs.chatmsgs));
            // console.log("============ cancer =============");
            it.socketInit();
        }
        else if(!res.ok)
        {
            console.log("you cant ):");
        }
      },
      err => {
        console.log("Error occured+ :: "+err);
      }
    );
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    var key = event.key;
    if(key === "Enter")
    {
      document.getElementById('txtfield').focus();
    }
  }

  hover(a)
  {
    console.log(a);
    if(a)
    {
      this.showv=true;
    }
    else
      this.showv=false;
  }

  onInput(event: any)
  {
    let a = (<HTMLInputElement>event.target).value;

      if(event.keyCode == 13)
      {
        this.msg = (<HTMLInputElement>event.target).value;
        (<HTMLInputElement>event.target).value = '';
  
        this.submitMessage();
        console.log(this.msg);
      }
    
    // else
    // {
    //   this.block=true;
    // }
  }

  submitMessage()
  {
    let str2:RegExp = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;
    let str:RegExp =  /^[a-z0-9._]+$/i;
    if(this.msg.match(str2))
    {
     // console.log("matches");
       this.socket.emit('chat message', this.user,': '+this.msg,this.type);
      // this.usermsg.push("tester");
      // this.msgs.push(this.msg);
    }
    else
    {
      console.log("doesnt match");
    }
   
  }

  submitLog()
  {
    var pass = prompt("Password: ", "");
    this.socket.emit('sendlogs',pass,this.allmessages);
  }

  logout()
  {
    window.location.href = '/logout';
  }

  usertype(type)
  {
    if(type == "dev")
    {
        this.color = "red";
      // user = '[halva]'+user;
    }
    else if(type == "admin")
    {
        this.color = "orange";
      // user = '[halva]'+user;
    }
    else if(type == "hobo")
    {
        this.color = "black";
    }
    else
    {
        this.color = "green";
      // user = '[halva]'+user;
    }
  }

  updatechat()
  {
    console.log(this.chatmsgs.length);
    for(let i=0; i<this.chatmsgs.length; i++)
    {
        console.log(this.chatmsgs[i]);
        console.log(this.chatmsgs[i].msg);
        var msg = this.chatmsgs[i].msg;
        var type = this.chatmsgs[i].type;

        console.log(msg + " type of "+
        type);

        this.usermsg.push('');
        this.msgs.push(msg);

        var chat = document.getElementById("content");

        setTimeout(function() {
          chat.scrollTop = chat.scrollHeight;
          },10);
    } 
  }
  ngOnInit() {
  }

}
