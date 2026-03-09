import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import UserIcon from "../assets/user_default.png"

import { Pizza } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const Header = () => {

  const {user} = useContext(UserContext)!

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
            <li className="cursor-pointer hover:scale-105 ease-linear duration-110">
              <a href="#">Contato</a>
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 sm:bg-amber-400 p-2 rounded-xl sm:text-black cursor-pointer hover:opacity-95 hover:scale-102 duration-200">
              <ShoppingCart 
              size={25} 
              className="hover:scale-105 ease-linear duration-110" 
              />
              <p className="text-bold hidden sm:block">Carrinho</p>  
            </div>
            {user?.image_url ? (
              <Avatar size="lg" className="cursor-pointer hover:scale-105 duration-300">
                <AvatarImage
                  src={`http://localhost:8000${user?.image_url}`}
                  alt="@user"
                />
                <AvatarFallback>@{user.username}</AvatarFallback>
              </Avatar>
            ): (
              <Avatar size="lg" className="cursor-pointer hover:scale-105 duration-300">
                <AvatarImage
                  src={UserIcon}
                  alt="@user"
                  className="grayscale"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
