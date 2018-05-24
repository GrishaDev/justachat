import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  constructor() { }

  title = 'test';
  login:boolean = true;
  buttontxt:string = "Create account";

  onSwitch()
  {
    this.login = !this.login;

    if(this.login)
    {
      this.buttontxt = "Create account";
    }
    else
    {
      this.buttontxt = "Login";
    }
  }
  
  ngOnInit() {
  }
}
