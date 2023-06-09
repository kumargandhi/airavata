import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import {
    getWorkOrders,
    workOrdersFetched,
} from '../actions/work-order.actions';
import { IWorkOrder } from '../../interfaces/work-order.interface';
import { WorkOrderService } from '../../services/work-order.service';

@Injectable()
export class WorkOrderEffects {
    getWorkOrders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getWorkOrders),
            mergeMap(() => {
                return this._workOrderService.getWorkOrders().then((docs) => {
                    const wos: IWorkOrder[] = [];
                    docs.docs.forEach((doc) => {
                        const item = doc.data();
                        wos.push(item);
                    });
                    return workOrdersFetched({ val: wos });
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private _workOrderService: WorkOrderService
    ) {}
}
