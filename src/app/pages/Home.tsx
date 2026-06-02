"use client"
import { PressButton } from "../../components/ui/Button";
import { PressInput } from "../../components/ui/Input";
import TaskCard from "../../components/task/TaskCard";
import TaskEmpty from "../../components/task/TaskEmpty";
import { useState } from "react";
import { useTasks } from "../../hooks/useTask";
import '@/styles/pages/home.css'
import { WithIcons } from "@/components/ui/ToggleButton";


export default function Home() {
    const [title, setTitle] = useState("");
    const { tasks, createTask, deleteTask, startTask, finishTask } = useTasks();

    function handleCreate() {
        const trimmed = title.trim();
        if (!trimmed) return;
        createTask(trimmed);
        setTitle("");
    }
    
    return (
    <div className="home">
        <WithIcons></WithIcons>
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
                <TaskCard
                key={task.id}
                task={task}
                onStart={startTask}
                onFinish={finishTask}
                onDelete={deleteTask}
            />
            ))
        )}
        </section>
    </div>
  );
}
