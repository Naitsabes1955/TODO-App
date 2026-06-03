import { getTodoListById } from "@/services/todo"
import { NextResponse } from "next/server";
import { Controlled } from "@/components/task/TextField";

const TodoListId = async ({params,}: {params: Promise<{ id: string }>;}) => {

    const {id} = await params;

    const fetchData = async () => {

        try {
            const res = await fetch(`/api/todolist/${id}`);
            return NextResponse.json({message: "response"},{status: 200})
        } catch (error) {
            return NextResponse.json(
            {message: "Error Obtaining id"},
            {status: 500}
        )
        }
    }

    fetchData();
    console.log(id)
    return <>
        <div>
            <h1>Comments</h1>
            <p>probando, el id es: {id}</p>
            <Controlled></Controlled>
        </div>
    
    </>
}

export default TodoListId