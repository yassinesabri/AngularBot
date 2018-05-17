import { ChatService, Message } from './../chat.service';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // add new value to the accumulate behavior subject arrat and get an observable array
    this.messages =  this.chat.conversation.asObservable()
    .scan((acc, val) => acc.concat(val));
  }

  sendMessage() {
    this.chat.talk(this.formValue);
    this.formValue = '';
  }

}
