export interface IWorkOrder {
    actionTaken: string;
    completionDate: Date;
    creationDate: Date;
    estimation: number;
    manPower: number;
    paid: number;
    priority: string;
    scheduleDate: Date;
    status: string;
    tradeName: string;
}