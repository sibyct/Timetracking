export interface Project {
    id: number;
    name: string;
    client: string;
    type: string;
    startDate: Date;
    endDate?: Date;
    status: 'Ongoing' | 'Completed' | 'On Hold';
}
