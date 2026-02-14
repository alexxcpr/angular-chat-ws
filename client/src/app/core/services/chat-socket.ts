import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatSocket {
  private socket: Socket = io('http:localhost:3000');

  sendMessage(msg: string): void {
    const msgTrimmed = msg.trim();
    if (!msgTrimmed) return;

    this.socket.emit('chat_message', msgTrimmed);
  }

  // onMessage() TODO
}
