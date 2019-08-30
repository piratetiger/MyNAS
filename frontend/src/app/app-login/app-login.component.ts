import { Component, Inject } from '@angular/core';
import { LoginService } from './login.service/login.service';
import { AppService } from '../app.service/app.service';
import { MessageModel, MessageType } from '../app.models/message-model';

@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
    public username: string;
    public password: string;

    constructor(private service: LoginService, private appService: AppService) {
    }

    public submit() {
        this.service.login({
            username: this.username,
            password: this.password
        }).subscribe(d => {
            if (d) {
                localStorage.setItem('token', d);
            } else {
                const message = new MessageModel();
                message.type = MessageType.Error;
                message.message = 'Username and Password not match.';
                this.appService.messages.emit(message);
                this.password = '';
            }
        });
    }
}
