
import { useEffect, useState } from "react"

import type {Task,TaskStatus,} from "../types/task"

const STORAGE_KEY = "tasks"

export function useTasks() {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks", error);
      }
    }
  }, []); //execute code at the moment that a component executed

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    )
  }, [tasks])

  function createTask(title: string) {

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "Pending",
      accumulatedTime: 0,
      startedAt: null,
      createdAt: Date.now(),
    }

    setTasks(prevTasks => [
      ...prevTasks,
      newTask,
    ])
  }

  function deleteTask(id: string) {

    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== id)
    )
  }

  function startTask(id: string) {

    setTasks(prevTasks =>
      prevTasks.map(task => {

        if (task.id === id) {
          return {
            ...task,
            status: "inProgress" as TaskStatus,
            startedAt: Date.now(),
          }
        }

        return task
      })
    )
  }
function finishTask(id: string) {

    setTasks(prevTasks =>
      prevTasks.map(task => {

        if (task.id !== id) {
          return task
        }

        if (!task.startedAt) {
          return task
        }

        const elapsedSeconds = Math.floor(
          (Date.now() - task.startedAt) / 1000
        )

        return {
          ...task,

          status: "Done" as TaskStatus,

          accumulatedTime:
            task.accumulatedTime + elapsedSeconds,

          startedAt: null,
        }
      })
    )
  }
  

  return {
    tasks,createTask,deleteTask,startTask,finishTask
  }
}