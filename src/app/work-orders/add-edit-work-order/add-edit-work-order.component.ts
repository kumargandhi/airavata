import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
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
    activeStepIndex = '1';

    constructor(
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef
    ) {
        this.steps = [
            {
                label: 'Details',
                id: 'details',
                tabindex: '1',
            },
            {
                label: 'Estimate',
                id: 'estimate',
                tabindex: '2',
            },
            {
                label: 'Action',
                id: 'action',
                tabindex: '3',
            },
            {
                label: 'Summary',
                id: 'summary',
                tabindex: '4',
            },
        ];
    }

    @Input() set workOrder(value: IWorkOrder) {
        this._workOrder = value;
    }

    ngOnInit(): void {}

    activeIndexChanged($event: any) {
        console.log($event);
    }
}
