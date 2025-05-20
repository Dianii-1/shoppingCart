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
  try {
    const body = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({ data: body });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  try {
  
     await prisma.todo.deleteMany({ where:{complete : true} });

    return NextResponse.json('Elementos eliminados');
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
