import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {ApiAiClient} from 'api-ai-javascript';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) {

  }
}

@Injectable()
export class ChatService {
  readonly token = environment.dialogFlow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token});
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  talk(msg: string) {
    const message = new Message(msg, 'user');
    this.update(message);
    this.client.textRequest(msg)
    .then((res) => {
      const speech = res.result.fulfillment.speech;
      const botMsg = new Message(speech, 'bot');
      this.update(botMsg);
    });
  }



}
