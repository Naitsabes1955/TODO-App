export type TaskStatus = 
    "Pending" |
    "inProgress" |
    "Done";

export interface Task {
    id: string,
    title: string;
    description?: string;
    status: TaskStatus;
    accumulatedTime: number;
    createdAt: number;
    startedAt: number | null;
    finalizedAt?: number;
}

export type TaskAction =
    (id: string) => void;
