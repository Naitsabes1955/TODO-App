import type {Task} from "./task";
import type { TaskAction } from "./task";


export interface CardProps {
    task: Task;
    onStart: TaskAction;
    onFinish: TaskAction;
    onDelete: TaskAction;
}