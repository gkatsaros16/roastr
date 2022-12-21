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

  constructor(
    private roastRoomService: RoastRoomService
  ) {

  }

  ngOnInit(): void {

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
    this.roastRoomService.sendReadyUser();
  }

  unready() {
    this.isReady = false;
  }

  ngOnDestroy() {

  }
}
