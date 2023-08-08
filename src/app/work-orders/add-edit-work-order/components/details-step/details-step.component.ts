import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IWorkOrder } from 'src/app/common/interfaces/work-order.interface';
import { DestroyService } from 'src/app/common/services/destroy.service';

@Component({
    selector: 'app-details-step',
    templateUrl: './details-step.component.html',
    styleUrls: ['./details-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class DetailsStepComponent {
    form: FormGroup;

    loading = false;

    _errorText = '';
    _workOrder: IWorkOrder;

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef
    ) {}

    @Input() set workOrder(value: IWorkOrder) {
        this._workOrder = value;
    }

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            tradeName: [this._workOrder?.tradeName, Validators.required],
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

    set errorText(value: string) {
        this._errorText = value;
    }
}