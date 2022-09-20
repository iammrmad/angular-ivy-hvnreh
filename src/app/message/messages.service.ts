import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "./message.model";

@Injectable()
export class MessagesService{
   newMessages:Subject<Message> = new Subject<Message>();
   
   addMessage( message:Message ):void{
     
   }
}