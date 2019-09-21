import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from './infrastructure/services/app.service/app.service';
import { MessageModel, MessageType } from './infrastructure/models/message-model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private service: AppService, private messageService: MessageService) {
        this.service.messages.subscribe((msg: MessageModel) => {
            this.messageService.add({ severity: MessageType[msg.type].toLowerCase(), summary: msg.title, detail: msg.message });
        });
    }
}
