import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '../common/services/destroy.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../common/services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../login/login.component.scss', './sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class SignUpComponent {
    form!: FormGroup;

    loading = false;

    errorText = '';

    today = new Date();

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    formSubscribe() {
        this.form.valueChanges
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

    signup() {
        const { username, password } = this.form.controls;
        if (!this.form.valid) {
            username.markAsDirty();
            password.markAsDirty();
            return;
        }
        this.loading = true;
        this.errorText = '';
        this._authService.signUp(username.value, password.value);
    }
}
