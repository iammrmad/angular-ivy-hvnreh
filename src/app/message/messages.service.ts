import { Injectable } from '@angular/core';
import {
  filter,
  map,
  Observable,
  publishReplay,
  refCount,
  scan,
  Subject,
} from 'rxjs';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';

const initialMessages: Message[] = [];

@Injectable()
export class MessagesService {
  messages: Observable<Message[]>;

  newMessages: Subject<Message> = new Subject<Message>();

  create: Subject<Message> = new Subject<Message>();

  updates: Subject<any> = new Subject<any>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      scan(
        (messages: Message[], operation: IMessagesOperation) =>
          operation(messages),
        initialMessages
      ),
      publishReplay(),
      refCount()
    );

    this.create
      .pipe(
        map((message: Message): IMessagesOperation => {
          return (messages: Message[]) => messages.concat(message);
        })
      )
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead
      .pipe(
        map((thread: Thread) => {
          return (messages: Message[]) => {
            return messages.map((message: Message) => {
              if (message.thread.id == thread.id) {
                message.isRead = true;
              }
              return message;
            });
          };
        })
      )
      .subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return message.thread.id == thread.id && message.author.id !== user.id;
      })
    );
  }
}

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}
