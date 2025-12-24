export interface TimesheetEntry {
    id: string;
    date: Date;
    projectId: string;
    hours: number;
    description: string;
}

export interface Timesheet {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    entries: TimesheetEntry[];
}
