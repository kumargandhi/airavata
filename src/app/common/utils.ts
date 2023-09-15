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
    return newWO;
}