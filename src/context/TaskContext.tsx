"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Task, TaskStatus } from "../types/task";
import { createTodo, deleteTodo, updateTodoStatus } from "@/services/todo";

interface TaskContextValue {
  tasks: Task[];
  createTask: (title: string) => void;
  deleteTask: (id: string) => void;
  startTask: (id: string) => void;
  finishTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const STORAGE_KEY = "tasks";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored) as Task[]);
      } catch (err) {
        console.error("Error parsing tasks from storage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

/*   function createTask(title: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "Pending",
      accumulatedTime: 0,
      startedAt: null,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  } */
    async function createTask(title:string): Promise<void>{
      const newTask = await createTodo(title);
      setTasks((actualTask) => [{ ...newTask, id: newTask._id}, ...actualTask]);
    }

    async function deleteTask(id: string): Promise<void> {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }

    /* function startTask(id: string): void {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? ({ ...t, status: "inProgress" as TaskStatus, startedAt: Date.now() })
            : t
        )
      );
    } */
    async function startTask(id: string): Promise<void>{
      const startedAt = Date.now();
      const updated = await updateTodoStatus(id,"inProgress",{startedAt});
      setTasks((actualTask) => 
        actualTask.map((t)=> 
          t.id === id ? {...t,status: "inProgress" as TaskStatus,startedAt} : t
        )
      );
    }

/*   function finishTask(id: string): void {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id || !t.startedAt) return t;
        const elapsed = Math.floor((Date.now() - t.startedAt) / 1000);
        return {
          ...t,
          status: "Done" as TaskStatus,
          accumulatedTime: t.accumulatedTime + elapsed,
          startedAt: null,
          finalizedAt: Date.now(),
        };
      })
    );
  } */

    async function finishTask(id: string): Promise<void> {
    const task = tasks.find((t) => t.id === id);
    if (!task || !task.startedAt) return;
    const elapsed = Math.floor((Date.now() - task.startedAt) / 1000);
    const finalizedAt = Date.now();
    const accumulatedTime = task.accumulatedTime + elapsed;
    await updateTodoStatus(id, "Done", { finalizedAt, accumulatedTime, startedAt: null });
    setTasks((actualTask) =>
      actualTask.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "Done" as TaskStatus,
              accumulatedTime,
              startedAt: null,
              finalizedAt,
            }
          : t
      )
    );
  }
  return (
    <TaskContext.Provider
      value={{ tasks, createTask, deleteTask, startTask, finishTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used inside a <TaskProvider>");
  }
  return context;
}
