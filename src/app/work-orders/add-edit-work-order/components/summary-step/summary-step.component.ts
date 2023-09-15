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

    constructor(private datePipe: DatePipe) {}

    @Input() set workOrder(value: IWorkOrder) {
        this._workOrder = value;
    }

    getScheduleDate() {
        return this.datePipe.transform(this._workOrder.scheduleDate as Date, 'dd-MM-YYYY');
    }
}
