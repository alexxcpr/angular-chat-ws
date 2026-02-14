import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatSocket {
  private socket: Socket = io('http://localhost:3000');
  private myUsername = '';

  getMyUsername(): string {
    return this.myUsername;
  }

  // Payload trimis catre backend pentru un mesaj de chat.
  sendMessage(payload: { username: string; text: string }): void {
    const username = payload.username.trim();
    const text = payload.text.trim();
    if (!username || !text) return;

    this.myUsername = username;
    this.socket.emit('chat_message', { username, text });
  }

  //functie care asculta evenimentul 'chat_message' si trimite obiectul ChatMessage notat ca payload catre Oservable
  onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((subscriber) => {
      const handler = (payload: ChatMessage) => {
        subscriber.next(payload);
      }

      //adaugare listener
      this.socket.on('chat_message', handler);

      //functie de cleanup la unsubscribe
      return () => {
        //scoatere listener
        this.socket.off('chat_message', handler);
      }
    });
  }
}
