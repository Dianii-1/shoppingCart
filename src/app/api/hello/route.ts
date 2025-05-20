// escribir el comando rag para crear el api REST
import { NextResponse } from 'next/server'

export async function GET() { 

  return NextResponse.json({
    hola:'mundo'
  });
}