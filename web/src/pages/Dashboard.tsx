import { useEffect } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../components/ui/sidebar";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - PizzaExpress";
  }, []);

  return (
    <SidebarProvider>
      <DashboardSideBar />
      
      <SidebarInset className="flex-1 bg-gray-50 flex flex-col w-full h-full min-h-screen">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <header className="mb-8 flex items-center gap-4">
            <SidebarTrigger className="md:hidden shrink-0" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Visão Geral</h1>
              <p className="text-gray-500 mt-1 text-sm md:text-base">Bem-vindo ao painel de administração.</p>
            </div>
          </header>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
