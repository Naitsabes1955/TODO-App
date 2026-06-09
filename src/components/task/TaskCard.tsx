import { useTaskContext } from "../../context/TaskContext";
import { useTimer, formatTime } from "../../hooks/useTimer";
import type { Task } from "../../types/task";
import "../../styles/components/card.css";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, startTask, finishTask } = useTaskContext();

  const seconds = useTimer(task);

  const statusLabel =
    task.status === "Pending"    ? "Pendiente"   :
    task.status === "inProgress" ? "En progreso" :
    "Finalizada";
/* translate.status.pending
translate.status.inProgress
translate.status.done
translate.taskCard.buttonDelete */
  return (
    <div className={`task-card${task.status.toLowerCase()}`}>
      <div className="task-card-header">
        <span className={`task-status${task.status.toLowerCase()}`}>
          {statusLabel}
        </span>
        <button
          className="task-card-delete"
          onClick={() => deleteTask(task.id)}
          title="Delete Task"
        >
          Delete
        </button>
      </div>

      <h3 className="task-card-title">{task.title}</h3>

      <p className={`task-card-timer${task.status === "inProgress" ? " running" : ""}`}>
        ⏱ {formatTime(seconds)}
      </p>

      <div className="task-card-init">
        {task.status === "Pending" && (
          <button
            className="task-btn task-btn-start"
            onClick={() => startTask(task.id)}
          >
            Start
          </button>
        )}
        {task.status === "inProgress" && (
          <button
            className="task-btn task-btn-finish"
            onClick={() => finishTask(task.id)}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
