import { Component, OnInit } from '@angular/core';
import { RoastRoomService } from 'src/app/services/roast-room.service';

@Component({
  selector: 'app-getting-ready',
  templateUrl: './getting-ready.component.html',
  styleUrls: ['./getting-ready.component.scss']
})
export class GettingReadyComponent implements OnInit {
  isConnected: boolean = false;
  isReady: boolean = false;
  micTested: boolean = false;
  agreeTerms: boolean = false;
  user;

  constructor(
    private roastRoomService: RoastRoomService
  ) {

  }

  ngOnInit(): void {
    this.user = {
      id: (Math.random() + 1).toString(36).substring(7),
      username: `User#${(Math.random() + 1).toString(36).substring(10)}`
    }
  }

  connect() {
    this.isConnected = true;
  }

  testMic() {
    this.micTested = true;
  }

  agreeToTerms() {
    this.agreeTerms = true;
  }

  ready() {
    this.isReady = true;
    this.roastRoomService.sendReadyUser(this.user);
  }

  unready() {
    this.isReady = false;
  }

  ngOnDestroy() {

  }
}
