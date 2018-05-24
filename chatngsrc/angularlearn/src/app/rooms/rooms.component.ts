import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit 
{
  rooms:number[] = [];
  titles:string[] = [];
  ids:number[] = [];

  auth:boolean = false;
  user:string = "no one";
  type:string = "nothing";
  room:string = "-1";
  info:string = "Choose a room:"
  opacity:number = 0;

  constructor(private http: HttpClient,private router: Router) 
  {
    this.opacity = 1;
     for(let i=0; i < 1; i ++)
     {
      this.rooms.push(3);
      this.rooms.push(10);

      this.titles.push("da");
      this.titles.push("yaya");
     }

    // this.rooms.push(7);
    // this.rooms.push(2);

     this.roomsinit();

    //  setTimeout(function() {
    //   chat.scrollTop = chat.scrollHeight;
    //   it.allowshow=true;
    //   },10);
  }

  roomsinit()
  {
    var it = this;
    const req = this.http.get('/rooms', {
    
    })
    .subscribe(
      function(res:any)
      {
        console.log(res);

       // var user = JSON.parse(res.user);
        if(res.ok)
        {
            it.rooms = res.rooms;
            it.titles = res.titles;
            it.ids = res.ids;
      
            it.user = res.user;
            it.type = res.type;
            console.log("hello "+res.user+ " type of "+res.type);
            if(res.type == "admin" || res.type=="dev")
            {
              it.auth = true;
            }
            // console.log(res.rooms);
            // console.log("new room :::"+ it.rooms);
            // console.log(it.rooms);
            // console.log(res.rooms);
        }
        else if(!res.ok)
        {
            console.log("you cant ):");
        }
      },
      err => {
       // console.log(this.wrong);
        console.log("Error occured+ :: "+err);
       // this.wrong = true;
       // this.autherror = "Error connecting to server."
      }
    );
  }
  roomClick(a)
  {
    console.log("you pressed on room number "+a+" with online of "+this.rooms[a]
    +" and title of "+this.titles[a]);
    var it = this;
    
    if(a > -1)
    {
      const req = this.http.post('/chatenter', {
        "room": a,
        "chosed": true
      })
      .subscribe(
        function(res:any)
        {
          console.log(res);
  
         // var user = JSON.parse(res.user);
          if(res.ok)
          {
            it.room = a.toString();
            it.router.navigate(['chat'],
            {queryParams: {room: it.room}});
          }
          else if(!res.ok)
          {
              console.log("you cant ):");
          }
        },
        err => {
         // console.log(this.wrong);
          console.log("Error occured+ :: "+err);
          
         // this.wrong = true;
         // this.autherror = "Error connecting to server."
        }
      );
    }
  }

  logout()
  {
      window.location.href = '/logout';
  }

  addroom()
  {
    var it = this;
    let a = prompt("input name of room");

    while(a.length <= 0)
    {
      a = prompt("atleast 1 letter..");
    }

    const req = this.http.post('/newroom', {
      "name": a,
    })
    .subscribe(
      function(res:any)
      {
        console.log(res);

       // var user = JSON.parse(res.user);
        if(res.ok)
        {
           // window.location.reload();
           it.roomsinit();
        }
        else if(!res.ok)
        {
            console.log("you cant ):");
        }
      },
      err => {
       // console.log(this.wrong);
        console.log("Error occured+ :: "+err);
       // this.wrong = true;
       // this.autherror = "Error connecting to server."
      }
    );
  }

  deleteClick(a)
  {
    let txt:string = prompt("Are you sure to delete room "+this.titles[a]+" ? type yes if yes");
    var it = this;

    if(txt === "yes")
    {
      const req = this.http.post('/delroom', {
        "room": a,
        "id": this.ids[a]
      })
      .subscribe(
        function(res:any)
        {
          console.log("i delete yes");

        // var user = JSON.parse(res.user);
          if(res.ok)
          {
            // window.location.reload();
            it.roomsinit();
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
  }
  ngOnInit() {
  }

}
