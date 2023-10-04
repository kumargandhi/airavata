import { createAction, props } from '@ngrx/store';

import { IWorkOrder } from '../../interfaces/work-order.interface';

export const WO_ = '[WORK_ORDER]';
export const WOS_FETCHED = `${WO_}s fetched`;
export const UPDATED_WO = `${WO_}s updated`;
export const CREATED_WO = `${WO_}s created`;

export const workOrdersFetched = createAction(
    WOS_FETCHED,
    props<{ val: IWorkOrder[] }>()
);

export const getWorkOrders = createAction(`get ${WO_}s`);
export const updateWorkOrder = createAction(`update ${WO_}`, props<{ val: IWorkOrder }>());
export const createWorkOrder = createAction(`create ${WO_}`, props<{ val: IWorkOrder }>());
export const workOrderUpdated = createAction(UPDATED_WO);
export const workOrderCreated = createAction(CREATED_WO);