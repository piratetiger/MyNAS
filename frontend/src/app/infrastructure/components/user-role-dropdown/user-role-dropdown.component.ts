import { Component, Input, forwardRef } from '@angular/core';
import { UserRole } from '../../models/user-role';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AppService } from '../../services/app.service/app.service';

@Component({
    selector: 'user-role-dropdown',
    templateUrl: './user-role-dropdown.component.html',
    styleUrls: ['./user-role-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UserRoleDropdownComponent),
            multi: true
        }
    ]
})
export class UserRoleDropdownComponent implements ControlValueAccessor {
    private _value;
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChangeCallback(v);
        }
    }

    get value() {
        return this._value;
    }

    private onTouchedCallback = () => { };
    private onChangeCallback = (v) => { };

    public get roles() {
        const result = [];
        result.push({ label: UserRole[UserRole.Guest], value: UserRole.Guest });
        result.push({ label: UserRole[UserRole.User], value: UserRole.User });
        result.push({ label: UserRole[UserRole.DataAdmin], value: UserRole.DataAdmin });
        result.push({ label: UserRole[UserRole.SystemAdmin], value: UserRole.SystemAdmin });
        return result;
    }

    writeValue(value: any): void {
        if (value !== this._value) {
            this._value = value;
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
