import { Injectable } from '@angular/core';
import { Firestore, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { COLLECTION_WORK_ORDERS, workOrderCol } from './firebase.db';
import { IWorkOrder } from '../interfaces/work-order.interface';

@Injectable({
    providedIn: 'root',
})
export class WorkOrderService {
    constructor(public firestore: Firestore) {}

    getWorkOrders() {
        return getDocs(workOrderCol(this.firestore));
    }

    updateWorkOrder(wo: IWorkOrder) {
        const docRef = doc(this.firestore, COLLECTION_WORK_ORDERS, wo.id);
        return setDoc(docRef, wo);
    }
}
