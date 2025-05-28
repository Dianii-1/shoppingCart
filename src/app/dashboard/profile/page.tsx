'use client'

import { useSession } from "next-auth/react";

export default function ProfilePage() {

    // este solo se utiliza del lado del cliente para obtener la sesion autenticada
    // pero para utilizarlo tiene que estar dentro de un provider y este tiene que estar en la parte mas alta
    // de la aplicacion osea ene l layout
    const {data:session} = useSession()
  return (
    <div className="flex flex-col gap-4">
      <h1>Perfil del lado del cliente</h1>
      <hr />
      <span>{session?.user?.name ?? 'Not-name'}</span>
      <span>{session?.user?.email ?? 'no-email'}</span>
      <span>{session?.user?.image ?? 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c'}</span>
      <span className="capitalize">{session?.user?.roles?.join(',') ?? ['no-roles']}</span>
      <span>{session?.user?.id ?? 'no-uuid'}</span>
    </div>
  );
}