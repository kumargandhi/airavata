import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
} from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import {
    CREATED_WO,
    DELETED_WO,
    UPDATED_WO,
    WOS_FETCHED,
    createWorkOrder,
    deleteWorkOrder,
    getWorkOrders,
    updateWorkOrder,
} from '../common/state/actions/work-order.actions';
import { DestroyService } from '../common/services/destroy.service';
import { IWorkOrder } from '../common/interfaces/work-order.interface';
import { PRIORITIES, STATUSES } from '../main/constants';
import { AddEditWorkOrderComponent } from './add-edit-work-order/add-edit-work-order.component';
import { convertWorkOrderTimeStampsToDates, initWorkOrder } from '../common/utils';

@Component({
    selector: 'app-work-orders',
    templateUrl: './work-orders.component.html',
    styleUrls: ['./work-orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, MessageService, ConfirmationService],
})
export class WorkOrdersComponent implements OnInit {
    loading = false;
    workOrders: IWorkOrder[];
    workOrder: IWorkOrder;
    showWorkOrderDialog = false;
    creatingWorkOrder = false;
    @ViewChild('addEditWOComponent')
    addEditWOComponent: AddEditWorkOrderComponent;
    confirmationMessage = '';

    constructor(
        private _destroy$: DestroyService,
        private _actionListener: ActionsSubject,
        private _cd: ChangeDetectorRef,
        private _store: Store,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
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
                } else if (action.type === UPDATED_WO) {
                    this.hideDialog();
                    this._messageService.add({severity:'success', summary: 'Success', detail: 'Work Order updated successfully!'});
                    this._store.dispatch(getWorkOrders());
                } else if (action.type === CREATED_WO) {
                    this.hideDialog();
                    this._messageService.add({severity:'success', summary: 'Success', detail: 'Work Order created successfully!'});
                    this._store.dispatch(getWorkOrders());
                } else if (action.type === DELETED_WO) {
                    this.hideDialog();
                    this._messageService.add({severity:'success', summary: 'Success', detail: 'Work Order deleted successfully!'});
                    this._store.dispatch(getWorkOrders());
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

    getTableSummary() {
        return `Total ${this.workOrders ? this.workOrders.length : 0} ${
            this.workOrders && this.workOrders.length > 1 ? 'Work Orders' : 'Work Order'
        }`;
    }

    editWorkOrder(wo: IWorkOrder) {
        this.creatingWorkOrder = false;
        this.workOrder = convertWorkOrderTimeStampsToDates(wo);
        this.showWorkOrderDialog = true;
    }

    hideDialog() {
        this.workOrder = null;
        this.showWorkOrderDialog = false;
    }

    newWorkOrder() {
        this.creatingWorkOrder = true;
        this.workOrder = initWorkOrder();
        this.showWorkOrderDialog = true;
    }

    handleUpdateWorkOrder($event: any) {
        this._store.dispatch(updateWorkOrder({ val: $event }));
    }

    handleCreateWorkOrder($event: any) {
        this._store.dispatch(createWorkOrder({ val: $event }));
    }

    deleteWorkOrder($event: IWorkOrder) {
        this.confirmationMessage = `Are you sure you want to delete work order '${$event.tradeName}'?`
        this._confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this._store.dispatch(deleteWorkOrder({ val: $event }));
            },
        });
    }
}
