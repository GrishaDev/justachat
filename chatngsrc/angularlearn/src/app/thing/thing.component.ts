import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.css']
})
export class ThingComponent implements OnInit {

  @Input()
  vur: string;

  txt = this.vur;
  
  constructor() { }

  ngOnInit() {
  }

}
