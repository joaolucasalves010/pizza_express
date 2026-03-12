import { Link } from "react-router-dom";
import { Home, Package, Plus, ChevronDown, Pizza } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from "./ui/sidebar";

const DashboardSideBar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <Sidebar className="border-r-2 border-gray-100 shadow-md z-10 bg-white">
      <div className="flex flex-col h-full bg-white w-full">
        <SidebarHeader className="p-4 pb-0 pt-6">
          <div className="flex items-center gap-2.5 mb-5 px-2">
            <Pizza className="w-7 h-7 shrink-0 text-orange-500" strokeWidth={2.5}/>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-tight">
              Pizza<span className="text-orange-500">Express</span>
            </h2>
          </div>
        </SidebarHeader>

        <SidebarSeparator className="mx-4 mb-6 bg-gray-200 h-px" />

        <SidebarContent className="p-4 pt-0">
          <nav className="flex flex-col gap-2 flex-1">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all font-medium"
        >
          <Home className="w-5 h-5" />
          Início
        </Link>

        <Collapsible
          open={isProductsOpen}
          onOpenChange={setIsProductsOpen}
          className="w-full space-y-1"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all font-medium data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" />
              Produtos
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isProductsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pt-1 pb-1 overflow-hidden transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <Link
              to="/products/create-product"
              className="flex items-center gap-3 px-3 py-2 mt-1 text-gray-500 hover:text-orange-600 rounded-lg transition-colors text-sm font-medium pl-10 hover:bg-orange-50/50"
            >
              <Plus className="w-4 h-4" />
              Criar produto
            </Link>
          </CollapsibleContent>
          </Collapsible>
        </nav>
        </SidebarContent>
        <SidebarFooter>
          
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default DashboardSideBar;
