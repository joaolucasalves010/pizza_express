import { Pizza } from "lucide-react";

import AvatarComponent from "./AvatarComponent";
import CartComponent from "./CartComponent";

const Header = () => {
  return (
    <>
      <header className="bg-red-600 text-white sticky">
        <nav className="flex justify-between p-8 w-full items-center">
          <div className="flex gap-1 items-center">
            <Pizza size={30}/>
            <h1 className="lg:text-xl md:text-xl font-bold">Pizza Express</h1>
          </div>
          <ul className="hidden md:flex lg:flex gap-5">
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
            <CartComponent />
            <AvatarComponent />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
