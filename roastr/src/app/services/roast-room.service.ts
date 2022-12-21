import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoastRoomService {
  roastRooms = this.socket.fromEvent<[]>('getRoastRooms');
  constructor(private socket: Socket) { }

  public sendMessage(message) {
    this.socket.emit('addMessage', message);
  }

  public addRoom() {
    this.socket.emit('addRoom');
  }
}