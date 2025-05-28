"use server";

// se coloca use server para dar a entender que las funciones colocadas aca son echas desde el servidor
// estos son los server actions incorporados en next para evitar la creacion de una funcion y peticion REST

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `El todo con id ${id} no existe`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updateTodo;
};

export const addTodo = async (description:string, userId:string) => {
    try {
        const todo = await prisma.todo.create({data:{description,userId}});
        revalidatePath("/dashboard/server-todos");
        return todo;
    } catch (error) {
        return {
            message:'Error creando TODO',
            error
        }
    }
}

export const deleteCompleted = async ():Promise<void> => {
    try {
        await prisma.todo.deleteMany({ where:{complete : true} });
        revalidatePath("/dashboard/server-todos");
    } catch (error) {
        console.error(error)
    }
}