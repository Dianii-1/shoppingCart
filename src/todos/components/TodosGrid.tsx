'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import { toggleTodo } from "../actions/todo-actions"
// import * as api from "../helpers/todos"
// import { useRouter } from "next/navigation"

interface Props {
    todos?:Todo[]
}

export const TodosGrid = ({todos=[]}:Props) => {

  // const router = useRouter()
  // const updateTodo = async (id:string, complete:boolean) => {
  //   await api.updateTodo(id,complete)
  //   router.refresh()
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
        ))}
    </div>
  )
}
