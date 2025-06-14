// nextauth.d.ts
// se crea este archivo para poder definir que tipo va a tener la sesion que se devuelve de nextAuth
import {  DefaultUser } from "next-auth";


interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module "next-auth" {
  type User = IUser

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = IUser
}