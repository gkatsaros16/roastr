import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { RoastRoomService } from 'src/app/services/roast-room.service';

@Component({
  selector: 'app-roast-room',
  templateUrl: './roast-room.component.html',
  styleUrls: ['./roast-room.component.scss']
})
export class RoastRoomComponent implements OnInit {
  newMessage: string;
  messageList: string[] = [];
  _messages: Subscription;
  roomDetails$;

  constructor(
    private chatService: ChatService,
    private roastRoomService: RoastRoomService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        let id = params.get('id');
        this.roastRoomService.getRoomDetails(id);
      }
    )
  }

  ngOnInit(): void {
    this.roomDetails$ = this.roastRoomService.roomDetails$;

    this._messages = this.chatService.messages.subscribe(x => {
      this.messageList.push(x);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  leave() {
    // this.isReady = false;
  }

  ngOnDestroy() {
    this._messages.unsubscribe();
  }
}
