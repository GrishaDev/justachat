import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes,RouterModule, Router} from '@angular/router'
import { AppComponent } from './app.component';
import { Title } from './title/title.component';
import { ThingComponent } from './thing/thing.component';
import { BoxComponent } from './login/box/box.component';
import { SignupComponent } from './login/signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ChatComponent } from './chat/chat.component'

const appRoutes: Routes =
[
  {path: '',component:LoginComponent},
  {path: 'test',component:Title},
  {path: 'rooms',component:RoomsComponent},
  {path: 'chat',component:ChatComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    Title,
    ThingComponent,
    BoxComponent,
    SignupComponent,
    LoginComponent,
    RoomsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//,{useHash: true}