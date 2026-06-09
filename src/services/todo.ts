export const getTodoList = async () => {
  const res = await fetch("/api/todolist");
  if (!res.ok) throw new Error("Error obtaining tasks");
  return res.json();
};

export const getTodoListById = async (id: string) => {
  const res = await fetch(`/api/todolist/${id}`);
  if (!res.ok) throw new Error("Error obtaining task by id");
  return res.json();
};

export const createTodo = async (title: string) => {
  const res = await fetch("/api/todolist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Error creating task");
  return res.json();
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`/api/todolist/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting task");
  return res.json();
};

export const updateTodoStatus = async (
  id: string,
  status: string,
  extra?: Record<string, unknown>
) => {
  const res = await fetch(`/api/todolist/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, ...extra }),
  });
  if (!res.ok) throw new Error("Error updating task");
  return res.json();
};
