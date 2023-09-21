import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IWorkOrder } from 'src/app/common/interfaces/work-order.interface';
import { DestroyService } from 'src/app/common/services/destroy.service';

@Component({
    selector: 'app-add-edit-work-order',
    templateUrl: './add-edit-work-order.component.html',
    styleUrls: ['./add-edit-work-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddEditWorkOrderComponent implements OnInit {
    _workOrder: IWorkOrder;

    steps: MenuItem[];
    activeStepIndex = 0;

    isPreviousBtnDisabled = true;
    isNextBtnDisabled = false;

    isLastStep = false;

    @Output()
    updateWorkOrder: EventEmitter<IWorkOrder> = new EventEmitter();

    @Input()
    creatingWorkOrder: boolean;

    constructor(
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef
    ) {
        this.steps = [
            {
                label: 'Details',
                id: 'details',
                tabindex: '0',
            },
            {
                label: 'Estimate',
                id: 'estimate',
                tabindex: '1',
            },
            {
                label: 'Action',
                id: 'action',
                tabindex: '2',
            },
            {
                label: 'Summary',
                id: 'summary',
                tabindex: '3',
            },
        ];
    }

    @Input() set workOrder(value: IWorkOrder) {
        this._workOrder = value;
    }

    ngOnInit(): void {}

    activeIndexChanged($event: any) {
        console.log($event);
        this.toggleButtons();
    }

    previousStep() {
        this.activeStepIndex--;
        this.toggleButtons();
    }

    nextStep() {
        this.activeStepIndex++;
        if (!this.isLastStep) {
            this.toggleButtons();
        } else {
            // Update the work order
            this.updateWorkOrder.emit(this._workOrder);
        }
        this._cd.markForCheck();
    }

    toggleButtons() {
        this.isLastStep = false;
        if (this.activeStepIndex <= 0) {
            this.isPreviousBtnDisabled = true;
            this.isNextBtnDisabled = false;
        } else {
            this.isPreviousBtnDisabled = false;
            this.isNextBtnDisabled = false;
        }
        if (this.activeStepIndex === 3) {
            this.isPreviousBtnDisabled = false;
            this.isNextBtnDisabled = true;
            // For submit enable
            this.isLastStep = true;
            this.isNextBtnDisabled = false;
        }
    }
}
