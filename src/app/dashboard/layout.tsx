import { Sidebar, TopMenu } from "@/components";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Sidebar/>
      <div className="ml-auto mb-6 bg-gray-200 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 pt-6 bg-white p-2 pb-6 m-2 rounded-xl">{children}</div>
      </div>
    </>
  );
}
