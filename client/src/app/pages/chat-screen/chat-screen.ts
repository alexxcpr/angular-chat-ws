import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatSocket } from '../../core/services/chat-socket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, FormsModule, NzInputModule, NzAvatarModule, NzCardModule, NzTypographyModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css',
})
export class ChatScreen {
  // nevoie pentru html:
  messages = signal<ChatMessage[]>([])
  draft = '';
  private messageSub?: Subscription;

  constructor(private chatSocket: ChatSocket) {}

  ngOnInit(): void {
    this.messageSub = this.chatSocket.onMessage().subscribe((chatMsg) => {
      this.messages.update(list => [...list, chatMsg]);
    })
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
  }

  send(): void{
    this.chatSocket.sendMessage(this.draft);
    console.log(`mesaj trimis din client: ${this.draft}`);
    this.draft = '';
  }

  onSearch(event: NzInputSearchEvent): void {
    this.send();
  }
}
