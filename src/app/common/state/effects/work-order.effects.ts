import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import {
    createWorkOrder,
    getWorkOrders,
    updateWorkOrder,
    workOrderCreated,
    workOrderUpdated,
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
                        item.id = doc.id;
                        wos.push(item);
                    });
                    return workOrdersFetched({ val: wos });
                });
            })
        );
    });

    updateWorkOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateWorkOrder),
            mergeMap((action) => {
                return this._workOrderService.updateWorkOrder(action.val).then(() => {
                    return workOrderUpdated();
                });
            })
        );
    });

    createWorkOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createWorkOrder),
            mergeMap((action) => {
                return this._workOrderService.createWorkOrder(action.val).then(() => {
                    return workOrderCreated();
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private _workOrderService: WorkOrderService
    ) {}
}
