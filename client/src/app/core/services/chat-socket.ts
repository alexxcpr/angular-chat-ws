import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatSocket {
  private socket: Socket = io('http:localhost:3000');
}
