import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listado de TODOS',
 description: 'SEO Title',
};

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({orderBy:{description:'asc'}})

  return (
    <div>
      <p className="text-3xl mb-8">Sever Actions</p>
      <div className="w-full mx-5 mb-5 px-3">
        <NewTodo/>
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}