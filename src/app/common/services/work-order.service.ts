import { Injectable } from '@angular/core';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { workOrderCol } from './firebase.db';

@Injectable({
    providedIn: 'root',
})
export class WorkOrderService {
    constructor(public firestore: Firestore) {}

    getWorkOrders() {
        return getDocs(workOrderCol(this.firestore));
    }
}
