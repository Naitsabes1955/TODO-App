import { useState } from "react";
import {PressButton} from "../ui/Button";
import {PressInput} from "../ui/Input";
import { useTasks } from "../../hooks/useTask";
import '../../styles/components/card.css'

export default function TaskForm(){
    const [title,setTitle] = useState("");
    const {createTask} = useTasks();

    function handleCreate() {
        const trimmed = title.trim()
        if(!trimmed) return;
        createTask(trimmed)
        setTitle("")
    }
    return(
        <div>
            <PressInput
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Write The name of your task"
            />
            <PressButton onClick={handleCreate}>Add Task</PressButton>
        </div>
    )
}