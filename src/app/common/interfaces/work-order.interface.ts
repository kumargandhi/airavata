import { Timestamp } from '@angular/fire/firestore';

/**
 * Work order template
 * Step 1 - Details; tradeName, status, priority
 * Step 2 - Estimate; estimation, manPower, scheduleDate
 * Step 3 - <Only edit> Action; actionTaken, completionDate, paid
 * Step 3 - Summary
 */
export interface IWorkOrder {
    id?: string;
    // Step 1 inputs
    tradeName: string;
    // New, Assigned, Completed, Archived
    status: string;
    // High, Medium, Low
    priority: string;

    // Step 2 inputs
    estimation: number;
    manPower: number;
    scheduleDate: Timestamp | Date;

    // Step 3 inputs but only in edit mode.
    actionTaken: string;
    completionDate: Timestamp | Date;
    paid: number;

    creationDate: Timestamp | Date;
}
