//  se coloca esto ya que estamos utilizando server actions para quitar el cache
// que por defecto Next tiene con sus peticiones

export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/auth/action/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'Listado de TODOS',
 description: 'SEO Title',
};

export default async function RestTodosPage() {

   const user = await getUserSessionServer();

  if(!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where:{userId:user.id},
    orderBy:{description:'asc'}
  })

  return (
    <div>
      <div className="w-full mx-5 mb-5 px-3">
        <NewTodo/>
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}