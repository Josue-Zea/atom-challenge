export interface Task {
    taskId?: string;
    title: string;
    description: string;
    creation_date: Date;
    completed: boolean;
}