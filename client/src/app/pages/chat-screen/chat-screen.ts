import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatSocket } from '../../core/services/chat-socket';

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, FormsModule, NzInputModule, NzAvatarModule, NzCardModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css',
})
export class ChatScreen {
  // nevoie pentru html:
  messages: ChatMessage[] = []
  draft = '';

  constructor(private chatSocket: ChatSocket) {}

  send(): void{
    this.chatSocket.sendMessage(this.draft);
    console.log(`mesaj trimis din client: ${this.draft}`);
    this.draft = '';
  }

  // message.text
  onSearch(event: NzInputSearchEvent): void {
    this.send();
  }
}
