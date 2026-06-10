import { useTaskContext } from "../../context/TaskContext";
import { useTimer, formatTime } from "../../hooks/useTimer";
import type { Task } from "../../types/task";
import "../../styles/components/card.css";
import { useTranslation } from "@/context/i18nContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, startTask, finishTask } = useTaskContext();

  const seconds = useTimer(task);
  const {translate} = useTranslation();
  
  const statusLabel =
    task.status === "Pending"    ? translate.status.pending   :
    task.status === "inProgress" ? translate.status.inProgress :
    translate.status.done;
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
          {translate.taskCard.buttonDelete}
        </button>
      </div>

      <h3 className="task-card-title">{task.title}</h3>

      <p className={`task-card-timer${task.status === "inProgress" ? " running" : ""}`}>
        {translate.timer.label} {formatTime(seconds)}
      </p>

      <div className="task-card-init">
        {task.status === "Pending" && (
          <button
            className="task-btn task-btn-start"
            onClick={() => startTask(task.id)}
          >
            {translate.taskCard.buttonStart}
          </button>
        )}
        {task.status === "inProgress" && (
          <button
            className="task-btn task-btn-finish"
            onClick={() => finishTask(task.id)}
          >
            {translate.taskCard.buttonFinish}
          </button>
        )}
      </div>
    </div>
  );
}
