import { Injectable, EventEmitter } from '@angular/core';
import { MessageModel } from '../app.models/message-model';

@Injectable()
export class AppService {
    public messages = new EventEmitter<MessageModel>();
}
