import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, FormsModule, NzInputModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css',
})
export class ChatScreen {
  // nevoie pentru html:
  messages = []
  draft = '';
  send(): void{
    console.log(`mesaj trimis: ${this.draft}`);
    this.draft = '';
  }
  // message.text
  onSearch(event: NzInputSearchEvent): void {
    this.send();
  }
}
