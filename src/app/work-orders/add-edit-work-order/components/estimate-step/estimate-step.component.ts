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
    selector: 'app-estimate-step',
    templateUrl: './estimate-step.component.html',
    styleUrls: ['./estimate-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class EstimateStepComponent implements OnInit {
    form: FormGroup;

    loading = false;

    _errorText = '';
    _workOrder: IWorkOrder;

    scheduleDate: Date;

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
        if (this._workOrder) {
            this.scheduleDate = new Date(
                this._workOrder?.scheduleDate.seconds * 1000
            );
        }
        this.scheduleDate = new Date();
        this.form = this._fb.group({
            estimation: [this._workOrder?.estimation, Validators.required],
            manPower: [this._workOrder?.manPower, Validators.required],
            scheduleDate: [this.scheduleDate, Validators.required],
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
        this._workOrder.estimation = data.estimation;
        this._workOrder.manPower = data.manPower;
        this._workOrder.priority = data.priority;
    }

    set errorText(value: string) {
        this._errorText = value;
    }
}
