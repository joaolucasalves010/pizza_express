import { useEffect, useState } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import useGetUser from "@/hooks/useGetUser";

const Dashboard = () => {
  const { getUser } = useGetUser()

  useEffect(() => {
    document.title = "Dashboard - PizzaExpress";

    getUser()
  }, []);

  return (
    <SidebarProvider>
      <DashboardSideBar />
      <SidebarInset className="flex-1 bg-gray-50 flex flex-col w-full h-full min-h-screen">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <header className="mb-8 flex items-center gap-4">
            <SidebarTrigger className="md:hidden shrink-0" />
          </header>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
