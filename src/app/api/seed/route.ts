import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany(); // es igual que hacer DELETE * FROM todo
  await prisma.user.deleteMany(); // se elimina todos los usuarios ya creados

   await prisma.user.create({
    data: {
      email: "usuario.prueba@hotmail.com",
      password: bcrypt.hashSync("123456"),
      roles: ["user", "admin"],
      todos: {
        create: [
          { description: "Piedra del alma", complete: true },
          { description: "Piedra del poder" },
          { description: "Piedra del tiempo" },
          { description: "Piedra del espacio" },
          { description: "Piedra del realidad" },
        ],
      },
    },
  });

  // se comenta ya que se creo la relacion de user con todos hace falta asignarle un usuario
  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Piedra del alma", complete: true },
  //     { description: "Piedra del poder" },
  //     { description: "Piedra del tiempo" },
  //     { description: "Piedra del espacio" },
  //     { description: "Piedra del realidad" },
  //   ],
  // });

  return NextResponse.json({
    message: "Seed executed",
  });
}
