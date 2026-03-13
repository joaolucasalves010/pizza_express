import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  Plus,
  ChevronDown,
  Pizza,
  LayoutDashboard,
  Eye,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { UserContext } from "@/contexts/UserContext";

import UserIcon from "../assets/user_default.png";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOutIcon } from "lucide-react";

import api from "@/services/api";

const DashboardSideBar = () => {
  const { user, setUser } = useContext(UserContext)!
  const navigate = useNavigate()

  async function logout() {
    await api.get("/logout", {withCredentials: true})
    setUser(null)
    navigate("/auth/signin")
  }

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
      isActive(path)
        ? "bg-orange-500 text-white shadow-md shadow-orange-400/30"
        : "text-zinc-600 hover:bg-orange-50 hover:text-orange-600"
    }`;

  const subLinkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 mt-0.5 rounded-lg transition-all duration-200 text-sm font-medium pl-10 ${
      isActive(path)
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "text-zinc-500 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <Sidebar className="border-r border-zinc-200 shadow-sm z-10 bg-white">
      <div className="flex flex-col h-full w-full bg-white">

        {/* Header / Logo */}
        <SidebarHeader className="p-5 pb-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-400/40">
              <Pizza className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-800 tracking-tight leading-tight">
                Pizza<span className="text-orange-500">Express</span>
              </h2>
              <p className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                Dashboard
              </p>
            </div>
          </div>

          <div className="mt-5 h-px bg-zinc-100" />
        </SidebarHeader>

        {/* Nav */}
        <SidebarContent className="px-3 pt-1 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 px-3 mb-2">
            Menu
          </p>

          <nav className="flex flex-col gap-1">
            <Link to="/" className={navLinkClass("/")}>
              <Home className="w-4 h-4 shrink-0" />
              Home
            </Link>

            <Link to="/dashboard" className={navLinkClass("/dashboard")}>
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              Overview
            </Link>

            <div className="mt-4 mb-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 px-3">
                Gestão
              </p>
            </div>

            <Collapsible
              open={isProductsOpen}
              onOpenChange={setIsProductsOpen}
              className="w-full"
            >
              <CollapsibleTrigger
                className={`flex w-full items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isProductsOpen
                    ? "bg-orange-50 text-orange-600"
                    : "text-zinc-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 shrink-0" />
                  Produtos
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                    isProductsOpen ? "rotate-180 text-orange-500" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
                <div className="ml-3 mt-1 border-l-2 border-orange-100 pl-3 space-y-0.5">
                  <Link
                    to="/dashboard/products"
                    className={subLinkClass("/dashboard/products")}
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    Ver Produtos
                  </Link>
                  <Link
                    to="/dashboard/products/create"
                    className={subLinkClass("/dashboard/products/create")}
                  >
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    Criar Produto
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <div className="p-3 flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-12 h-12 cursor-pointer">
                  {user?.image_url ? (
                    <AvatarImage src={`http://localhost:8000${user.image_url}`}/>
                  ) : (
                    <AvatarImage src={UserIcon} />
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50 mx-2 cursor-pointer hover:opacity-95">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <button className="flex w-full gap-2 items-center cursor-pointer" onClick={logout}>
                      <LogOutIcon />
                      Sair
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-zinc-800">@{user?.username}</p>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default DashboardSideBar;
