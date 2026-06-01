import type { CardProps } from "../../types/card";
import '../../styles/components/card.css'

export default function TaskCard({ task, onStart, onFinish, onDelete }: CardProps) {
/*   const seconds = useTimer(task);
 */
  const statusLabel =
    task.status === "Pending" ? "Pendiente" :
    task.status === "inProgress" ? "En progreso" :
    "Finalizada";

  return (
    <div className={`task-card${task.status.toLowerCase()}`}>
      <div className="task-card-header">
        <span className={`task-status${task.status.toLowerCase()}`}>
          {statusLabel}
        </span>
        <button
          className="task-card-delete"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
        >
          Delete
        </button>
      </div>

      <h3 className="task-card-title">{task.title}</h3>


      <div className="task-card-init">
        {task.status === "Pending" && (
          <button className="task-btn task-btn-start" onClick={() => onStart(task.id)}>
            Start
          </button>
        )}
        {task.status === "inProgress" && (
          <button className="task-btn task-btn-finish" onClick={() => onFinish(task.id)}>
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
