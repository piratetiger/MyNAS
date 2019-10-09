import { Component } from '@angular/core';
import * as moment from 'moment';
import { LogModel } from '../../infrastructure/models/log-model';
import { AdminApiService } from '../../infrastructure/services/admin-api.service/admin-api.service';

@Component({
    selector: 'admin-log',
    templateUrl: './admin-log.component.html',
    styleUrls: ['./admin-log.component.scss']
})
export class AdminLogComponent {
    public logs: LogModel[];

    public startDate: Date;
    public endDate: Date;

    constructor(private service: AdminApiService) {
        this.startDate = moment().subtract(3, 'days').toDate();
        this.endDate = new Date();
    }

    public refreshLogs() {
        this.service.auditLog({
            start: moment(this.startDate).format('YYYYMMDD'),
            end: moment(this.endDate).format('YYYYMMDD')
        }).subscribe(d => {
            this.logs = d.data;
        });
    }
}
