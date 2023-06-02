import { createAction, props } from '@ngrx/store';

import { IWorkOrder } from '../../interfaces/work-order.interface';

export const WO_ = '[USER]';
export const WOS_FETCHED = `${WO_}s fetched`;

export const workOrdersFetched = createAction(
    WOS_FETCHED,
    props<{ val: IWorkOrder[] }>()
);

export const getWorkOrders = createAction(`get ${WO_}s`);