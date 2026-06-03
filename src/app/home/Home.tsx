"use client"
import { useState } from "react";
import { PressButton } from "@/components/ui/Button";
import { PressInput } from "@/components/ui/Input";
import TaskCard from "@/components/task/TaskCard";
import TaskEmpty from "@/components/task/TaskEmpty";
import { WithIcons } from "@/components/ui/ToggleButton";
import { useTaskContext } from "@/context/TaskContext";
import "@/styles/pages/home.css";


export default function Home() {
  const [title, setTitle] = useState<string>("");

  const { tasks, createTask } = useTaskContext();

  function handleCreate(): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    createTask(trimmed);
    setTitle("");
  }

  return (
    <div className="home">
      <WithIcons />
      <header className="home-header">
        <h1>Task Timer</h1>
      </header>

      <section className="home-form">
        <PressInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write the name of your task..."
        />
        <PressButton onClick={handleCreate}>Create</PressButton>
      </section>

      <section className="home-list">
        {tasks.length === 0 ? (
          <TaskEmpty />
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </section>
    </div>
  );
}
