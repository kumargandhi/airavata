import { createReducer, on } from '@ngrx/store';

import { IWorkOrder } from '../../interfaces/work-order.interface';
import { workOrdersFetched } from '../actions/work-order.actions';

export interface WorkOrderMgmtState {
    workOrders: IWorkOrder[];
}

export const initialState: WorkOrderMgmtState = {
    workOrders: [],
};

export const workOrderMgmtReducer = createReducer(
    initialState,
    on(
        workOrdersFetched,
        (state, { val }): WorkOrderMgmtState => ({ ...state, workOrders: val })
    )
);
