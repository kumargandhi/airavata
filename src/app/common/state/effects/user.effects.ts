import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { getUser, saveUser } from '../actions/user.action';
import { IUser } from '../../interfaces/user.interface';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
    testEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUser),
            map(() => ({ type: '[Movies API] Movies Loaded Success' }))
        );
    });

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUser),
            mergeMap(() => {
                const currentUser = this._storageService.get<IUser>(
                    StorageKeys.User,
                    StorageType.Local
                );
                return this._userService.getUser(currentUser).then((doc) => {
                    return saveUser({ val: doc.data() as IUser });
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private _storageService: StorageService,
        private _userService: UserService
    ) {}
}
