import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    AfterViewInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IWorkOrder } from 'src/app/common/interfaces/work-order.interface';
import { DestroyService } from 'src/app/common/services/destroy.service';
import { WORK_ORDER_WIZARD_STEPS_MENU } from 'src/app/main/constants';
import { cloneDeep } from 'lodash';
import { convertWorkOrderDatesToTimeStamps } from 'src/app/common/utils';

@Component({
    selector: 'app-add-edit-work-order',
    templateUrl: './add-edit-work-order.component.html',
    styleUrls: ['./add-edit-work-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddEditWorkOrderComponent implements OnInit, AfterViewInit {
    _workOrder: IWorkOrder;

    steps: MenuItem[];
    activeStepIndex = 0;

    isPreviousBtnDisabled = true;
    isNextBtnDisabled = false;

    isLastStep = false;

    @Output()
    updateWorkOrder: EventEmitter<IWorkOrder> = new EventEmitter();

    @Output()
    createWorkOrder: EventEmitter<IWorkOrder> = new EventEmitter();

    @Input()
    creatingWorkOrder: boolean;

    constructor(
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef
    ) {}

    @Input() set workOrder(value: IWorkOrder) {
        this._workOrder = value;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        if (this.creatingWorkOrder) {
            const menu = cloneDeep(WORK_ORDER_WIZARD_STEPS_MENU);
            this.steps = menu.filter((item) => item.tabindex !== '2');
        } else {
            this.steps = WORK_ORDER_WIZARD_STEPS_MENU;
        }
    }

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
            if (this.creatingWorkOrder) {
                // Create work order
                this.createWorkOrder.emit(
                    convertWorkOrderDatesToTimeStamps(this._workOrder)
                );
            } else {
                // Update the work order
                this.updateWorkOrder.emit(
                    convertWorkOrderDatesToTimeStamps(this._workOrder)
                );
            }
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
        if (this.creatingWorkOrder) {
            if (this.activeStepIndex === 2) {
                this.isPreviousBtnDisabled = false;
                this.isNextBtnDisabled = true;
                // For submit enable
                this.isLastStep = true;
                this.isNextBtnDisabled = false;
            }
        } else {
            if (this.activeStepIndex === 3) {
                this.isPreviousBtnDisabled = false;
                this.isNextBtnDisabled = true;
                // For submit enable
                this.isLastStep = true;
                this.isNextBtnDisabled = false;
            }
        }
    }
}
