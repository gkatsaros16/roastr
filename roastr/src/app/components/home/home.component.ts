import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoastRoomService } from 'src/app/services/roast-room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roastRooms: [] = [];
  _roastRooms: Subscription;
  constructor(
    private roastRoomService: RoastRoomService,
  ) { 
    this._roastRooms = this.roastRoomService.roastRooms.subscribe(x => {
      this.roastRooms = x;
    });
  }

  ngOnInit(): void {

  }

  addRoom() {
    this.roastRoomService.addRoom();
  }

  // ngOnDestroy() {
  //   this._roastRooms.unsubscribe();
  // }
}
