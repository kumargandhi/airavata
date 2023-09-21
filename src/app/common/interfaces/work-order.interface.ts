// Step 1 - Details; tradeName, status, priority
// Step 2 - Estimate; estimation, manPower, scheduleDate
// Step 3 - <Only edit> Action; actionTaken, completionDate, paid

import { Timestamp } from "@angular/fire/firestore";

// Step 3 - Summary
export interface IWorkOrder {
    id: string;
    actionTaken: string;
    completionDate: Timestamp | Date;
    creationDate: Timestamp | Date;
    estimation: number;
    manPower: number;
    paid: number;
    // High, Medium, Low
    priority: string;
    scheduleDate: Timestamp | Date;
    // New, Assigned, Completed, Archived
    status: string;
    tradeName: string;
}