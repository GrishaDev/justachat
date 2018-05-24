import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
  @ViewChild('f') form:NgForm;
  @ViewChild('f2') formquick:NgForm;

  username:string;
  userpass:string;
  userquick:string;
  msg:string;

  gavno = true;

  valid:boolean = false;
  wrong:boolean = false;
  autherror:string="??";

  constructor(private http: HttpClient)
  {
  }

  accSubmit(f)
  {
    var it = this;

    console.log(this.form);
    this.username = this.form.value.name;
    this.userpass = this.form.value.pass;

    const req = this.http.post('/loginsubmit', {
      "user": this.username,
      "pass": this.userpass
    })
    .subscribe(
      function(res:any)
      {
        console.log(res);

       // var user = JSON.parse(res.user);
        if(res.user)
        {
            //window.location.reload();
            window.location.href = '#rooms';
        }
        else if(res.wrong)
        {
            console.log(it.wrong);
            console.log("wrong password/acc");
            it.wrong = true;
            it.autherror = "User doesn't exist."
            console.log(this.wrong);
        }
        else if(res.logged)
        {
            console.log("this user logged in");
            it.wrong = true;
            it.autherror = "User already logged in."
        }  
      },
      err => {
        console.log(this.wrong);
        console.log("Error occured+ :: "+err);
       // this.wrong = true;
       // this.autherror = "Error connecting to server."
      }
    );
  }

  quickSubmit(f2)
  {
    console.log(this.formquick);
    this.userquick = this.formquick.value.namequick;
    var pass = "magicalnothingwaw23awaw"

    const req = this.http.post('/loginsubmit', {
      "user": this.userquick,
      "pass": pass
    })
    .subscribe(
      function(res:any)
      {
        console.log(res);

       // var user = JSON.parse(res.user);
        if(res.user)
        {
           // window.location.reload();
           window.location.href = '#rooms';

        }
        else if(res.logged)
        {
            console.log("this user logged in");
            this.wrong = true;
            this.autherror = "Name in use."
        }  
      },
      err => {
        console.log("Error occured+ :: "+err);
        this.wrong = true;
        this.autherror = "Error connecting to server."
      }
    );
  }

  inputChanged(event: Event)
  {
    this.wrong=false;
  }

  ngOnInit() 
  {
  }
}
