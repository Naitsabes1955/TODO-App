import { connectDB } from "@/lib/mongodb";
import { TaskModel } from "@/database/models/task";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const taskGet = await TaskModel.find({
            example: "Inyecting data and learning mongo",
        });

        return NextResponse.json(taskGet)
    } catch (error) {
        return NextResponse.json(
            {message: "Error obtaining tasks"},
            {status:500}
        )
    }
    
}

export async function POST(req:Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newTaskPost = await TaskModel.create({
        title: body.title,
        description: body.description
    });

    return NextResponse.json(newTaskPost,{status: 201});
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating task"},
            {status: 500}
        );
    }
}

export async function PUT(req:Request) {
    try {
        await connectDB();
        const body = await req.json();

        const updateTask = await TaskModel.findOneAndUpdate(body.id,
            {status: body.status, title: body.title},
            {new: true} //this is very important because if that not exist, mongo won't add a new document for update (give back the document without the change)
        );

        if (!updateTask){
            return NextResponse.json(
                    {message: "Task don't found"},
                    {status: 404}
                )
        }
        return NextResponse.json(updateTask)
    } catch (error) {
        return NextResponse.json(
            {message: "Error updating task"},
            {status: 500}
        )
    }
    
}
export async function DELETE(req:Request) {
    try {
        await connectDB();
        const {id} = await req.json();
        
        const deleteTask = await TaskModel.findOneAndDelete(id);
            if (!deleteTask){
                return NextResponse.json(
                    {message: "Error, task don't found"},
                    {status: 404}
                )
            };
        return NextResponse.json(
            {message: "Task deleted successfully"}
        )
    } catch (error) {
        return NextResponse.json(
            {message: "Error deleting task"},
            {status: 500}
        )
    }
}