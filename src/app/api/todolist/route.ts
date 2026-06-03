import { TaskModel } from "@/database/models/task";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

await connectDB();

export async function GET() {
    try {
        const data = await TaskModel.find({});
        return NextResponse.json(data, {status: 200} );
    } catch (error) {
        return NextResponse.json(
            {message: "Error Obtaining data"},
            {status: 500}
        )
    };
}