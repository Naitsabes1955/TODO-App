import { TaskModel } from "@/database/models/task";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request:Request, {params}: {params: Promise<{ data: string }>},) {
    try {
        
    const {data} = await params;
    

    const Data = await TaskModel.findById({data});
    return NextResponse.json(Data,{status: 200})
    } catch (error) {
        return NextResponse.json( 
        {message: "Error Obtaining by id"},
        {status: 500}
    )
}}