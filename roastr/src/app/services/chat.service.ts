import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  messages = this.socket.fromEvent<string>('messages');
  constructor(private socket: Socket) { }

  public sendMessage(message) {
    this.socket.emit('addMessage', message);
  }
}