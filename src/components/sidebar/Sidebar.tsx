import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";


export const Sidebar = async () => {

  const session = await getServerSession(authOptions);

  const items = [
    {
      path: "/dashboard",
      title: "Dashboard",
      icon:  <IoCalendarOutline size={30} />,
    },
    {
        path: "/dashboard/rest-todos",
        title: "Rest TODOS",
        icon:  <IoCheckboxOutline size={30} />,
      },
      {
        path: "/dashboard/server-todos",
        title: "Server Actions",
        icon:  <IoListOutline size={30} />,
      },
      {
        path: "/dashboard/cookies",
        title: "Cookies",
        icon:  <IoCodeWorkingOutline size={30} />,
      },
      {
        path: "/dashboard/products",
        title: "Productos",
        icon:  <IoBasketOutline size={30} />,
      },
      {
        path: "/dashboard/profile",
        title: "Perfil",
        icon:  <IoPersonOutline size={30} />,
      },
]
    

return (
<aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r border-gray-300 bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
  <div>
    <div className="-mx-6 px-6 py-4">
      <Link href={"/dashboard"}>
        <Image
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"
          }
          alt="tailus logo"
          className="w-32"
          width={150}
          height={150}
        />
      </Link>
    </div>

    <div className="mt-8 text-center">
      <Image
        src={session?.user?.image ?? ''}
        alt="user"
        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
        width={28}
        height={28}
      />
      <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
        {session?.user?.name ?? 'Sin nombre'}
      </h5>
      <span className="hidden text-gray-400 lg:block">Admin</span>
    </div>

    <ul className="space-y-2 tracking-wide mt-8">
      {items.map(item => 
        <SidebarItem key={item.title} {...item} />
      )}
    </ul>
  </div>

  <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-300">
    <LogoutButton/>
  </div>
</aside>
);
}

