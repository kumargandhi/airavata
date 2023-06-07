export interface IWorkOrder {
    actionTaken: string;
    completionDate: Date;
    creationDate: Date;
    estimation: number;
    manPower: number;
    paid: number;
    // High, Medium, Low
    priority: string;
    scheduleDate: Date;
    // New, Assigned, Completed, Archived
    status: string;
    tradeName: string;
}