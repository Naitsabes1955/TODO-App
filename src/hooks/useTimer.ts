import { useEffect, useState } from "react";
import type { Task } from "../types/task";

/**
 * Devuelve los segundos acumulados de una tarea.
 *
 * • Si la tarea está "inProgress", el contador corre en tiempo real
 *   (se actualiza cada segundo con setInterval).
 * • Para cualquier otro estado retorna el tiempo ya guardado en
 *   task.accumulatedTime (sin actualización dinámica).
 */
export function useTimer(task: Task): number {
  const [elapsed, setElapsed] = useState<number>(task.accumulatedTime);

  useEffect(() => {
    setElapsed(task.accumulatedTime);

    if (task.status !== "inProgress" || task.startedAt === null) return;

    const base = task.startedAt;
    const tick = (): void => {
      setElapsed(task.accumulatedTime + Math.floor((Date.now() - base) / 1000));
    };

    tick(); 
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [task]);

  return elapsed;
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number): string => String(n).padStart(2, "0");

  return h > 0
    ? `${pad(h)}:${pad(m)}:${pad(s)}`
    : `${pad(m)}:${pad(s)}`;
}
