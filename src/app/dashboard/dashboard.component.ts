import { Component, OnInit } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';

import {
    WOS_FETCHED,
    getWorkOrders,
} from '../common/state/actions/work-order.actions';
import { DestroyService } from '../common/services/destroy.service';
import { IWorkOrder } from '../common/interfaces/work-order.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    workOrders: IWorkOrder[];

    constructor(
        private _destroy$: DestroyService,
        private _actionListener: ActionsSubject,
        private _store: Store
    ) {}

    ngOnInit(): void {
        // Dispatch action to get the user
        this._store.dispatch(getWorkOrders());
        this._actionListener
            .pipe(takeUntil(this._destroy$), skip(1))
            .subscribe((action: any) => {
                if (action.type === WOS_FETCHED) {
                    this.workOrders = action.val;
                }
            });
    }
}
