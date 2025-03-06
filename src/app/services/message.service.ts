import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  maxMessages = 10;

  add(message: string): void {
    if (this.messages.length >= this.maxMessages) {
      this.messages.pop();
    }
    this.messages.unshift(message);
  }

  clear(): void {
    this.messages = [];
  }
}
