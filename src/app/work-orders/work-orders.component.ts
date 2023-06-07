import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';

import {
    WOS_FETCHED,
    getWorkOrders,
} from '../common/state/actions/work-order.actions';
import { DestroyService } from '../common/services/destroy.service';
import { IWorkOrder } from '../common/interfaces/work-order.interface';

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

    editWorkOrder(wo: IWorkOrder) {}
}
