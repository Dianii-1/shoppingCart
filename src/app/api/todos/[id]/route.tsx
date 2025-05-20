import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const findById = await prisma.todo.findFirst({ where: { id: params.id } });

  if (!findById) {
    return NextResponse.json(
      { message: `El todo con id ${params.id} no existe` },
      { status: 404 }
    );
  }
  return NextResponse.json({
    findById,
  });
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const findById = await prisma.todo.findFirst({ where: { id: params.id } });

  if (!findById) {
    return NextResponse.json(
      { message: `El todo con id ${params.id} no existe` },
      { status: 404 }
    );
  }

  try {
    const {complete,description} = await putSchema.validate(await request.json());

  const updateTodo = await prisma.todo.update({
    where: { id: params.id },
    data: {complete,description},
  });
  return NextResponse.json(
    updateTodo,
  );
  } catch (error) {
    return NextResponse.json(error, {status:400});
  }
  
}
