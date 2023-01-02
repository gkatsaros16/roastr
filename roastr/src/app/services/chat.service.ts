import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages = this.socket.fromEvent<string>('messages');
  constructor(private socket: Socket) { }

  public sendMessage(message) {
    this.socket.emit('addMessage', message);
  }

  public getMessages() {
    this.socket.emit('getMessages');
  }
}