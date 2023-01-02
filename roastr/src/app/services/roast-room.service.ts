import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoastRoomService {
  roastRooms = this.socket.fromEvent<[]>('getRoastRooms');
  roomDetails$ = new BehaviorSubject({});
  constructor(
    private socket: Socket,
    private router: Router
  ) { }

  public sendMessage(message) {
    this.socket.emit('addMessage', message);
  }

  public getRooms() {
    this.socket.emit('getRoastRooms');
  }

  public addRoom() {
    this.socket.emit('addRoom');
  }

  public addRoomAndGetId() {
    this.socket.emit("addRoomAndGetId", "", (response) => {
      this.router.navigate(['/roast-room', response])
    });
  }

  public getRoomDetails(id) {
    this.socket.emit("getRoomDetails", id, (response) => {
      this.roomDetails$.next(response);
    });
  }

  public sendReadyUser(user) {
    this.socket.emit("addReadyUser", user, (response) => {
      if (response) {
        console.log(response)
        this.router.navigate(["../roast-room", response.id])
      }
    });
  }
}