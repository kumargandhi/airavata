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

export const WORK_ORDER_WIZARD_STEPS_MENU = [
    {
        label: 'Details',
        id: 'details',
        tabindex: '0',
    },
    {
        label: 'Estimate',
        id: 'estimate',
        tabindex: '1',
    },
    {
        label: 'Action',
        id: 'action',
        tabindex: '2',
    },
    {
        label: 'Summary',
        id: 'summary',
        tabindex: '3',
    },
];
