import {
    Firestore,
    CollectionReference,
    collection,
    DocumentData,
} from '@angular/fire/firestore';
import { IUser } from '../interfaces/user.interface';
import { IWorkOrder } from '../interfaces/work-order.interface';

export const COLLECTION_USERS = 'users';
export const COLLECTION_WORK_ORDERS = 'work_orders';

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(
    firestore: Firestore,
    collectionName: string
) => {
    return collection(firestore, collectionName) as CollectionReference<T>;
};

// export all your collections
export const usersCol = (firestore: Firestore) =>
    createCollection<IUser>(firestore, COLLECTION_USERS);
export const workOrderCol = (firestore: Firestore) =>
    createCollection<IWorkOrder>(firestore, COLLECTION_WORK_ORDERS);
