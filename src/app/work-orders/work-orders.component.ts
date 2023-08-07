import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
} from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';

import {
    WOS_FETCHED,
    getWorkOrders,
} from '../common/state/actions/work-order.actions';
import { DestroyService } from '../common/services/destroy.service';
import { IWorkOrder } from '../common/interfaces/work-order.interface';
import { PRIORITIES, STATUSES } from '../main/constants';
import { AddEditWorkOrderComponent } from './add-edit-work-order/add-edit-work-order.component';

@Component({
    selector: 'app-work-orders',
    templateUrl: './work-orders.component.html',
    styleUrls: ['./work-orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class WorkOrdersComponent implements OnInit {
    loading = false;
    workOrders: IWorkOrder[];
    workOrder: IWorkOrder;
    showWorkOrderDialog = false;
    @ViewChild('addEditWOComponent')
    addEditWOComponent: AddEditWorkOrderComponent;

    constructor(
        private _destroy$: DestroyService,
        private _actionListener: ActionsSubject,
        private _cd: ChangeDetectorRef,
        private _store: Store
    ) {}

    ngOnInit(): void {
        this.loading = true;
        // Dispatch action to get the work orders.
        this._store.dispatch(getWorkOrders());
        this._actionListener
            .pipe(takeUntil(this._destroy$), skip(1))
            .subscribe((action: any) => {
                if (action.type === WOS_FETCHED) {
                    this.workOrders = action.val;
                }
                this.loading = false;
                this._cd.detectChanges();
            });
    }

    getPriorityTagClass(priority: string) {
        if (priority === PRIORITIES.High) {
            return 'danger';
        } else if (priority === PRIORITIES.Medium) {
            return 'warning';
        } else {
            return 'info';
        }
    }

    getStatusTagClass(status: string) {
        if (status === STATUSES.Completed) {
            return 'success';
        } else if (status === STATUSES.Archived) {
            return 'warning';
        } else {
            return 'info';
        }
    }

    editWorkOrder(wo: IWorkOrder) {
        this.workOrder = wo;
        this.showWorkOrderDialog = true;
    }

    hideDialog() {}
}
