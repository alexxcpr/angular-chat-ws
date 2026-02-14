import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatSocket } from '../../core/services/chat-socket';
import { Subscription } from 'rxjs';
import { ChatForm } from '../../components/chat-form/chat-form';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, NzAvatarModule, NzTypographyModule, ChatForm, NzCardModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css',
})
export class ChatScreen {
  // nevoie pentru html:
  messages = signal<ChatMessage[]>([])
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
}
