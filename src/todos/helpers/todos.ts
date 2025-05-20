import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };

  // si se realizara la peticion desde el lado del servidor habria que colocar la url completa
  const todoDb = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return todoDb;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  // si se realizara la peticion desde el lado del servidor habria que colocar la url completa
  const todoDb = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return todoDb;
};

export const deleteTodosCompleted = async (): Promise<boolean> => {

  // si se realizara la peticion desde el lado del servidor habria que colocar la url completa
   await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return true;
};
