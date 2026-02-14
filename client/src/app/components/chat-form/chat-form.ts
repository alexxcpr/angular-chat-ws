import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ChatSocket } from '../../core/services/chat-socket';

@Component({
  selector: 'app-chat-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './chat-form.html',
  styleUrl: './chat-form.css',
})
export class ChatForm {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    message: this.fb.control('', [Validators.required]),
  });

  constructor(private chatSocket: ChatSocket) {}


  send(): void{
    if (this.validateForm.invalid) return;

    const { username, message } = this.validateForm.getRawValue();
    this.chatSocket.sendMessage({
      username,
      text: message,
    });
    console.log(`mesaj trimis din client: ${message}`);
    this.validateForm.controls.message.reset('');
  }
}
