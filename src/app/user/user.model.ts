import { uuid } from '../util/uuid';

export class User {
  id: number;

  constructor(public name: string, public avatarSrc: string) {
    this.id = uuid();
  }
}
