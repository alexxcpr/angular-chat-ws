import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatSocket {
  private socket: Socket = io('http://localhost:3000');

  //metoda pentru trimitere mesaj (input din frontend trimis catre backend prin ws)
  sendMessage(msg: string): void {
    const msgTrimmed = msg.trim();
    if (!msgTrimmed) return;

    this.socket.emit('chat_message', msgTrimmed);
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
