import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../interfaces/user.interface';
import { DestroyService } from '../../services/destroy.service';
import { UserService } from '../../services/user.service';
import { validateEmail } from '../../validators/email.validator';
import { validatePassword } from '../../validators/password.validator';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class UserProfileComponent implements OnInit {
    _user: IUser;

    profileForm: FormGroup;

    passwordForm: FormGroup;

    loading = false;

    _errorText = '';

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _userSurvey: UserService
    ) {}

    @Input() set user(val: IUser) {
        this._user = val;
        if (!this._user) {
            return;
        }
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    ngOnInit(): void {
        if (!this._user) {
            return;
        }
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.profileForm = this._fb.group({
            email: [
                { value: this._user?.email, disabled: this._user?.email },
                validateEmail(),
            ],
            displayName: [this._user?.displayName, Validators.required],
        });
        this.passwordForm = this._fb.group({
            oldPassword: ['', validatePassword()],
            newPassword: ['', validatePassword()],
        });
    }

    formSubscribe() {
        this.profileForm.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
        this.passwordForm.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!data) {
            return;
        }
        this.loading = false;
        this.errorText = '';
    }

    set errorText(value: string) {
        this._errorText = value;
    }
}
