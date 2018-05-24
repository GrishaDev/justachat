import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit 
{
  @ViewChild('f') form:NgForm;
  username:string;
  userpass:string;

  valid:boolean = false;
  ismsg:boolean = false;
  msg:string="?";

  //http: HttpClient;

  constructor(private http: HttpClient) 
  {
    /* this.http.get('/users/waw').subscribe(data => {
      console.log(data);
    }); */
  }

  regSubmit(f)
  {
    var it = this;

    console.log(this.form);
    this.username = this.form.value.name;
    this.userpass = this.form.value.pass;

    //let xhr:any = new XMLHttpRequest();
    
    const req = this.http.post('/accsubmit', {
      "user": this.username,
      "pass": this.userpass
    })
    .subscribe(
      function(res:any)
      {
        console.log(res);

       // var user = JSON.parse(res.user);
        if(res.status)
        {
            it.ismsg=true;
            it.msg="Account created!";
        }
        else
        {
            it.ismsg=true;
            it.msg="Account already exist.";
        }
      },
      err => {
        console.log("Error occured+ :: "+err);
        this.ismsg=true;
        this.msg="Error connecting to server.";
      }
    );
    /* xhr.open('POST', 'http://localhost:3200/loginsubmit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    //x-www-form-urlencoded
    xhr.onload = function() {
        if(xhr.status === 200)
        {
            if(JSON.parse(xhr.responseText).user)
            {
                window.location.reload();
            }
            else if(JSON.parse(xhr.responseText).wrong)
            {
                console.log("wrong password/acc");
            //    document.getElementById('err').style.visibility = 'visible';
             //   document.getElementById('err').innerHTML = WRONG_ERROR;
            }
            else if(JSON.parse(xhr.responseText).logged)
            {
                console.log("this user logged in");
             //   document.getElementById('err').style.visibility = 'visible';
             //   document.getElementById('err').innerHTML = LOGGED_ERROR;
            }  
        }
        else if (xhr.status === 204 && xhr.responseText !== this.username) {
          console.log('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
          console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    var jsn = {"user":this.username,"pass":this.userpass};
    
    xhr.send(JSON.stringify(jsn)); */
  }

  inputChanged(event: Event)
  {
    this.ismsg=false;
  }

  ngOnInit() {
  }

}
