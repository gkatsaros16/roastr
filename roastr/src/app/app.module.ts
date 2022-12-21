import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentComponent } from './components/document/document.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ExampleComponent } from './components/example/example.component';
import { ChatComponent } from './components/chat/chat.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { RoastRoomComponent } from './components/roast-room/roast-room.component';
import { ExamplePageComponent } from './pages/example/example-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { RoastRoomPageComponent } from './pages/roast-room/roast-room-page.component';
import { RoastRoomCardComponent } from './components/roast-room-card/roast-room-card.component';
import { GettingReadyComponent } from './components/getting-ready/getting-ready.component';
import { GettingReadyPageComponent } from './pages/getting-ready-page/getting-ready-page.component';


const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentListComponent,
    DocumentComponent,
    ExampleComponent,
    ChatComponent,
    NavComponent,
    RoastRoomComponent,
    ExamplePageComponent,
    RoastRoomPageComponent,
    HomePageComponent,
    RoastRoomCardComponent,
    GettingReadyComponent,
    GettingReadyPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
