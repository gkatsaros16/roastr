import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
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
