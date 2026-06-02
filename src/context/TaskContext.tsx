"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Task, TaskStatus } from "../types/task";

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

  function createTask(title: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "Pending",
      accumulatedTime: 0,
      startedAt: null,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id: string): void {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function startTask(id: string): void {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? ({ ...t, status: "inProgress" as TaskStatus, startedAt: Date.now() })
          : t
      )
    );
  }

  function finishTask(id: string): void {
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
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTaskContext must be used inside a <TaskProvider>");
  }
  return ctx;
}
