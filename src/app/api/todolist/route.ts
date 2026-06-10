import { TaskModel } from "@/database/models/task";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const data = await TaskModel.find({});
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {message: "Error Obtaining tasks"},
            {status: 500}
        )
    };
}
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newTask = await TaskModel.create({
        title: body.title,
        description: body.description,
        });
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json(
        { message: "Error creating task" },
        { status: 500 }
        );
    }
}