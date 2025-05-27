import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"


// https://next-auth.js.org/getting-started/example ruta para realizar la autenticacion con nextAuth
// https://next-auth.js.org/configuration/initialization#route-handlers-app nueva configuracion para que funcione
// https://next-auth.js.org/v3/configuration/providers ejemplo de proveedores
// cuando nos pida authorization callback URL esta sera asi http://localhost:3000/api/auth/callback/:provider(este sera el proveedor en nuestro caso github)

//https://next-auth.js.org/providers/google pasos para autenticacion con google
// https://console.cloud.google.com/apis/credentials?inv=1&invt=AbyGZw&project=admin-todos-460619&supportedpurview=project obtener credenciales
// se crea un nuevo proyecto/ se da en crear credenciales/ crear id de cliente oauth/ configurar pantalla de concentimiento

export const authOptions = {
  // cinfigure adapter
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
