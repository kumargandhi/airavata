export const MENU_ITEMS = [
    {
        label: 'Dashboard',
        routerLink: ['dashboard'],
    },
    {
        label: 'Work Orders',
        routerLink: ['work-orders'],
    },
];

export enum PRIORITIES {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}

export enum STATUSES {
    New = 'New',
    Assigned = 'Assigned',
    Completed = 'Completed',
    Archived = 'Archived'
}
