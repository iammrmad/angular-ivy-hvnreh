import { Message } from '../message/message.model';
import { uuid } from '../util/uuid';

export class Thread {
  lastMessage: Message;
  id: number;
  name: string;
  avatarSrc: string;

  constructor(id?: number, name?: string, avatarSrc?: string) {
    this.id = id || uuid();
    this.name = name;
  }
}
