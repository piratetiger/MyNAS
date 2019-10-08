import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'admin-log',
    templateUrl: './admin-log.component.html',
    styleUrls: ['./admin-log.component.scss']
})
export class AdminLogComponent {
    public startDate: Date;
    public endDate: Date;

    constructor() {
        this.startDate = moment().subtract(3, 'days').toDate();
        this.endDate = new Date();
    }

    public refreshLogs() {

    }
}
