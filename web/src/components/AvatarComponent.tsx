import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator
} from "./ui/dropdown-menu";

import { ShoppingCart, LogOutIcon, User, LayoutDashboard } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import UserIcon from "../assets/user_default.png";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

import api from "@/services/api";

import { useNavigate } from "react-router-dom";


const AvatarComponent = () => {

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)!;

  async function logout() {
    setUser(null)
    await api.get("/logout", {withCredentials: true})
    location.reload()
  }

  return (
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
            <AvatarImage src={UserIcon} alt="@user" className="grayscale" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuGroup>
          {user?.role === "admin" && (
            <DropdownMenuItem>
              <button
                className="flex gap-2 items-center cursor-pointer w-full"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard />
                Dashboard
              </button>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
            <button
              className="flex gap-2 items-center cursor-pointer w-full"
              onClick={() => navigate("/edit-user")}
            >
              <User />
              Perfil
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShoppingCart />
            Meus pedidos
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button
              className="flex gap-2 items-center cursor-pointer w-full"
              onClick={logout}
            >
              <LogOutIcon />
              Sair
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarComponent;
