import { Injectable } from '@angular/core';
import {
    Firestore, doc, getDoc
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

export const COLLECTION_USERS = 'users';
export const COLLECTION_SURVEY_USER = 'survey_user';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    currentUser$ = new Subject<IUser>();

    private _currentUser: IUser;

    constructor(
        public firestore: Firestore,
    ) {}

    set currentUser(val: IUser) {
        this._currentUser = val;
        if (val) {
            this.currentUser$.next(val);
        }
    }

    getCurrentUser(): IUser {
        return this._currentUser;
    }

    // getUsers() {
    //     return this.firestore.collection(COLLECTION_USERS).snapshotChanges();
    // }

    getUser(user: IUser) {
        const docRef = doc(this.firestore, COLLECTION_USERS, user.uid);
        return getDoc(docRef);
    }

    // getUserDocumentFrommId(userId: string) {
    //     return this.firestore.collection(COLLECTION_USERS).doc(userId).ref;
    // }

    // deleteUser(userId: string) {
    //     return this.firestore.doc(`${COLLECTION_USERS}/` + userId).delete();
    // }
}
