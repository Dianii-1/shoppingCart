import { getUserSessionServer } from "@/auth/action/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // realizar paginacion
  const take = +(searchParams.get("take") ?? "10"); // el mas convierte un string en un numero, take para indicar cuantos valores tomar
  const skip = +(searchParams.get("skip") ?? "0"); // skip para indicar cuando valores saltarse

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "El parametro take tiene que ser un numero valido" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "El parametro skip tiene que ser un numero valido" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserSessionServer();

  if (!user) return NextResponse.json("No autorizado", { status: 401 });

  try {
    const {complete, description} = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({ data: {description,complete,userId:user.id} });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {

   const user = await getUserSessionServer();

  if (!user) return NextResponse.json("No autorizado", { status: 401 });

  try {
    await prisma.todo.deleteMany({ where: { complete: true, userId:user.id } });

    return NextResponse.json("Elementos eliminados");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
