import { OnInit, Component } from '@angular/core';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-files',
    templateUrl: './app-files.component.html',
    styleUrls: ['./app-files.component.scss'],
})
export class AppFilesComponent implements OnInit {
    private _toolbarState: string;

    public viewMode = true;
    public uploadFileList: any[] = [];
    public owners: any[] = [];
    public selectedOwners: string[] = [];
    public isPublic = true;

    public get toolbarState(): string {
        return this._toolbarState;
    }

    public set toolbarState(value) {
        if (value === this._toolbarState) {
            this._toolbarState = null;
        } else {
            this._toolbarState = value;
        }
    }

    constructor(private service: ApiService, private appService: AppService, private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {

    }
}
