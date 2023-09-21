import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IWorkOrder } from 'src/app/common/interfaces/work-order.interface';

@Component({
    selector: 'app-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss'],
    providers: [DatePipe]
})
export class SummaryStepComponent {
    _workOrder: IWorkOrder;

    @Input()
    creatingWorkOrder: boolean;

    constructor(private datePipe: DatePipe) {}

    @Input() set workOrder(value: IWorkOrder) {
        this._workOrder = value;
    }

    getScheduleDate() {
        return this.datePipe.transform(this._workOrder.scheduleDate as Date, 'MM/dd/YYYY');
    }

    getCompletionDate() {
        return this.datePipe.transform(this._workOrder.completionDate as Date, 'MM/dd/YYYY');
    }
}
