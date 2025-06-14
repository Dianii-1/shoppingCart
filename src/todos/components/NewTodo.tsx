"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as api from "../helpers/todos";
import { useRouter } from "next/navigation";
// import { addTodo, deleteCompleted } from "../actions/todo-actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;

    await api.createTodo(description); //helpers peticion por restfull api
    // await addTodo(description); peticion por server action
    setDescription("");
    router.refresh();
  };

  const deleteCompletedFuntion = async () => {
    await api.deleteTodosCompleted();
    router.refresh();
    // await deleteCompleted()
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompletedFuntion()}
        type="button"
        className="flex gap-2 items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Borrar completados
      </button>
    </form>
  );
};
