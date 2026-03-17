import { ShoppingCart, LogOutIcon, User, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserIcon from "../assets/user_default.png";

import { useNavigate } from "react-router-dom";

import { Pizza } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

import api from "@/services/api";

const Header = () => {

  const navigate = useNavigate()

  const {setUser} = useContext(UserContext)!

  async function logout() {
    setUser(null)
    await api.get("/logout", {withCredentials: true})
    location.reload()
  }

  const { user } = useContext(UserContext)!;

  return (
    <>
      <header className="bg-red-600 text-white sticky">
        <nav className="flex justify-between p-8 w-full items-center">
          <div className="flex gap-2 items-center">
            <Pizza size={30} />
            <h1 className="text-xl font-bold">Pizza Express</h1>
          </div>
          <ul className="hidden md:flex gap-5">
            <li className="cursor-pointer hover:scale-105 ease-linear duration-110">
              <a href="#cardapio">Cardápio</a>
            </li>
            <li className="cursor-pointer hover:scale-105 ease-linear duration-110">
              <a href="#">Promoções</a>
            </li>
            <li className="cursor-pointer hover:scale-105 ease-linear duration-110">
              <a href="#">Sobre</a>
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 sm:bg-amber-400 p-2 rounded-xl sm:text-black cursor-pointer hover:opacity-95 hover:scale-102 duration-200">
              <button className="flex items-center gap-2">
                <ShoppingCart
                size={25}
                className="hover:scale-105 ease-linear duration-110"
              />
              <p className="text-bold hidden sm:block">Carrinho</p>
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {user?.image_url ? (
                  <Avatar
                    size="lg"
                    className="cursor-pointer hover:scale-105 duration-300"
                  >
                    <AvatarImage
                      src={`http://localhost:8000${user?.image_url}`}
                      alt="@user"
                    />
                    <AvatarFallback>@{user.username}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar
                    size="lg"
                    className="cursor-pointer hover:scale-105 duration-300"
                  >
                    <AvatarImage
                      src={UserIcon}
                      alt="@user"
                      className="grayscale"
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36">
                  <DropdownMenuGroup>

                  {user?.role === "admin" && (
                    <DropdownMenuItem>
                      <button className="flex gap-2 items-center cursor-pointer w-full" onClick={() => navigate("/dashboard")}>
                        <LayoutDashboard />
                        Dashboard
                      </button>
                    </DropdownMenuItem>
                  ) }

                    <DropdownMenuItem>
                      <button className="flex gap-2 items-center cursor-pointer w-full" onClick={() => navigate("/edit-user")}>
                        <User />
                        Perfil
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingCart />
                      Meus pedidos
                    </DropdownMenuItem>

                    <DropdownMenuSeparator/>

                    <DropdownMenuItem>
                      <button className="flex gap-2 items-center cursor-pointer w-full" onClick={logout}>
                        <LogOutIcon />
                        Sair
                      </button>
                    </DropdownMenuItem>

                  </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
