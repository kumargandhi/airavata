// Step 1 - Details; tradeName, status, priority
// Step 2 - Estimate; estimation, manPower, scheduleDate
// Step 3 - <Only edit> Action; actionTaken, completionData, paid
// Step 3 - Summary
export interface IWorkOrder {
    actionTaken: string;
    completionDate: any;
    creationDate: Date;
    estimation: number;
    manPower: number;
    paid: number;
    // High, Medium, Low
    priority: string;
    scheduleDate: any;
    // New, Assigned, Completed, Archived
    status: string;
    tradeName: string;
}