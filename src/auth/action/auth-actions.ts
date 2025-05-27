// logica para auth actions para crear usuarios

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

// se encripta la contraseña

export const createUser = async (email:string, password:string) => {
    const user = await prisma.user.create({
        data:{
            email,
            password:bcrypt.hashSync(password),
            name:email.split('@')[0]
        }
    })

     return user;
}

export const signInEmailPassword = async (email:string, password:string) => {
    if(!email || !password) return null;

    const user = await prisma.user.findUnique({where: {email}});

   if(!user){
    const dbUser = await createUser(email, password);
    return dbUser;
   };

   if(!bcrypt.compareSync(password, user.password ?? '')) return null;

   return user;
}