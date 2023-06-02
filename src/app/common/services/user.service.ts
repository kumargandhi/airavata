import { Injectable } from '@angular/core';
import {
    Firestore, doc, getDoc, setDoc
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { head } from 'lodash';
import { IUser } from '../interfaces/user.interface';
import { COLLECTION_USERS } from './firebase.db';

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

    saveUser(user: IUser) {
        const docRef = doc(this.firestore, COLLECTION_USERS, user.uid);
        const userData: IUser = {
            uid: user.uid,
            email: user.email,
            displayName: head(user.email.split('@')),
            photoURL: null,
            emailVerified: false,
        };
        return setDoc(docRef, userData);
    }

    // getUserDocumentFrommId(userId: string) {
    //     return this.firestore.collection(COLLECTION_USERS).doc(userId).ref;
    // }

    // deleteUser(userId: string) {
    //     return this.firestore.doc(`${COLLECTION_USERS}/` + userId).delete();
    // }
}
