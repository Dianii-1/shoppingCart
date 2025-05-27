import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Dashboard',
 description: 'SEO Title',
};
export default async function DashboardPage() {

  // este metodo solo se utiliza del lado del servidor para obtener la sesion autenticada
  const session = await getServerSession(authOptions);

  if(!session){
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid grid-cols-1 gap-6 ">
      {/* TODO: src/components <WidgetItem /> */}
      <WidgetItem
        title="Usuario conectado S-Side"
      >
        <div className="flex flex-col gap-4">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
        </div>
        <div>
          {JSON.stringify(session.user)}
        </div>
      </WidgetItem>
      {/* TODO: Fin <WidgetItem /> */}
    </div>
  );
}
