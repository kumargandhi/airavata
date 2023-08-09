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
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export enum STATUSES {
    New = 'New',
    Assigned = 'Assigned',
    Completed = 'Completed',
    Archived = 'Archived'
}
