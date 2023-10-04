import { Timestamp } from "@angular/fire/firestore";
import { IWorkOrder } from "./interfaces/work-order.interface";
import { cloneDeep } from "lodash";

export function convertWorkOrderTimeStampsToDates(wo: IWorkOrder) {
    const newWO = cloneDeep(wo);
    if (newWO.scheduleDate) {
        newWO.scheduleDate = (newWO.scheduleDate as Timestamp).toDate();
    }
    if (newWO.completionDate) {
        newWO.completionDate = (newWO.completionDate as Timestamp).toDate();
    }
    if (newWO.creationDate) {
        newWO.creationDate = (newWO.creationDate as Timestamp).toDate();
    }
    return newWO;
}

export function convertWorkOrderDatesToTimeStamps(wo: IWorkOrder) {
    const newWO = cloneDeep(wo);
    if (newWO.scheduleDate) {
        newWO.scheduleDate = Timestamp.fromDate(newWO.scheduleDate as Date);
    }
    if (newWO.completionDate) {
        newWO.completionDate = Timestamp.fromDate(newWO.completionDate as Date);
    }
    if (newWO.creationDate) {
        newWO.creationDate = Timestamp.fromDate(newWO.creationDate as Date);
    }
    return newWO;
}

export function initWorkOrder() {
    const wo: IWorkOrder = {
        'tradeName': '',
        'status': 'New',
        'priority': 'Low',
        'estimation': 0,
        'manPower': 0,
        'scheduleDate': null,
        'actionTaken': '',
        'completionDate': null,
        'paid': 0,
        'creationDate': new Date()
    };
    return wo;
}