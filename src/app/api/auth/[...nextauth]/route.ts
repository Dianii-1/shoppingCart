import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { signInEmailPassword } from "@/auth/action/auth-actions";


// https://next-auth.js.org/getting-started/example ruta para realizar la autenticacion con nextAuth
// https://next-auth.js.org/configuration/initialization#route-handlers-app nueva configuracion para que funcione
// https://next-auth.js.org/v3/configuration/providers ejemplo de proveedores
// cuando nos pida authorization callback URL esta sera asi http://localhost:3000/api/auth/callback/:provider(este sera el proveedor en nuestro caso github)

//https://next-auth.js.org/providers/google pasos para autenticacion con google
// https://console.cloud.google.com/apis/credentials?inv=1&invt=AbyGZw&project=admin-todos-460619&supportedpurview=project obtener credenciales
// se crea un nuevo proyecto/ se da en crear credenciales/ crear id de cliente oauth/ configurar pantalla de concentimiento

//https://next-auth.js.org/providers/credentials pasos para autenticar con credenciales

export const authOptions:NextAuthOptions = {
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
    CredentialsProvider({
      name: "Credentials",

      credentials: {
      email: { label: "Correo electronico", type: "email", placeholder: "usuario@ejemplo.com" },
      password: { label: "Contraseña", type: "password", placeholder:"********" }
    },

    async authorize(credentials) {
      // Add logic here to look up the user from the credentials supplied
      const user = signInEmailPassword(credentials!.email, credentials!.password);

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } 
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      
    }
    })
    // ...add more providers here
  ],

  // se agrega esto para configurar los datos que se retornan y poder obteenr los que yo cree

  session:{
    strategy:'jwt'
  },

  // los callbacks es por donde pasa despues de realizar la autenticacion por los providers
  // estos son los valores por defecto que se tienen
  // async signIn (){
  //     return true
  //   },

  //   async jwt ({token}) {
  //     return token
  //   },

  //   async session({session}){
  //     return session
  //   }

  callbacks:{
    async signIn (){
      return true;
    },

    async jwt ({token}) {
      // console.log(token)
      // esto se realiza para encontrar el usuario en la base de datos para agregar en el token los roles y el id
      const dbUser = await prisma.user.findUnique({where:{email: token.email ?? 'no-email'}});

      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },

    async session({session, token}){

      // aca se agregan los campos faltantes para poder mostrarlos en el front
      // ya no muestra error de tipado ya que se agrego el archivo nextauth.d.ts
      if(session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
