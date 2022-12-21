import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-roast-room',
  templateUrl: './roast-room.component.html',
  styleUrls: ['./roast-room.component.scss']
})
export class RoastRoomComponent implements OnInit {
  test;
  newMessage: string;
  messageList: string[] = [];
  _messages: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this._messages = this.chatService.messages.subscribe(x => {
      this.messageList.push(x);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnDestroy() {
    this._messages.unsubscribe();
  }
}
