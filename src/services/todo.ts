import { NextResponse } from "next/server";

export const getTodoList = async () => {
  try {
    const res = await fetch("/api/todolist");
    return NextResponse.json(
        {message: 'List of task obtained successful',
        data: res},
        {status: 200}
    )
  } catch (error) {
    return NextResponse.json({
      message: 'There was a error obtaining Tasks',
      error: error instanceof Error ? error.message : 'Error unknowed'
    }, { status: 500 });
  }
};


export const getTodoListById = async (id:string) => {
  try {
    const res = await fetch(`/api/todolist/${id}`);
    return NextResponse.json(
        {message: 'Task obtained successful',
        data: res},
        {status: 200}
    )
    } catch (error) {
    return NextResponse.json({
      message: 'There was a error obtaining Task by id',
      error: error instanceof Error ? error.message : 'Error unknowed'
    }, { status: 500 });
  }
};
