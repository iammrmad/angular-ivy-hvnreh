import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { Thread } from './thread.model';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;

  constructor(messagesService: MessagesService) {
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};
        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;
        });
        return threads;
      })
    );
  }
}
