import { CircleUser, ShoppingCart } from "lucide-react";
import { Pizza } from "lucide-react";

const Header = () => {
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
              <a href="#">Cardápio</a>
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
            <ShoppingCart 
            size={25} 
            className="cursor-pointer hover:scale-105 ease-linear duration-110" 
            />
            <CircleUser
              size={25}
              className="cursor-pointer hover:scale-105 ease-linear duration-110"
            />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
