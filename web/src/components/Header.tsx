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
