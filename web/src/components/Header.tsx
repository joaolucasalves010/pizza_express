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
            <div className="flex items-center gap-2 sm:bg-amber-400 p-2 rounded-xl sm:text-black cursor-pointer hover:opacity-95 hover:scale-102 duration-200">
              <ShoppingCart 
              size={25} 
              className="hover:scale-105 ease-linear duration-110" 
              />
              <p className="text-bold hidden sm:block">Carrinho</p>  
            </div>
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
