import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';

export const USER_ = '[USER]';
export const USER_FETCHED = `${USER_} fetched`;

export const saveUser = createAction(
    USER_FETCHED,
    props<{ val: IUser }>()
);

export const getUser = createAction('[User mgmt] Get user');
