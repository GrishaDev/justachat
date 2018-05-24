import { Component } from '@angular/core';
import { timeout } from 'q';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
 // styleUrls: ['./app.component.css']
  styles: [`
  .online
  {
    font-size: 6em;
  }`]
})
export class Title {
  title = 'angular test';
  disabled=true;
  randomtxt = '';
  showtxt = false;
  things = ['a'];

  constructor()
  {
    setTimeout(()=> 
    {
      this.disabled=false;
    },1000);
  }

  onTestButtonClick()
  {
    this.title="button works!";
    this.showtxt = true;
    this.things.push(this.randomtxt);
  }
  onInput(event: Event)
  {
    this.randomtxt = (<HTMLInputElement>event.target).value;
  }

  getColor()
  {
    return this.showtxt === true ? 'green' : 'red';
  }
}
