import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

import PizzaExpressIcon from "../../public/pizza.png"

const DashboardHome = () => {

  const { user } = useContext(UserContext)!

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl">Olá, <strong>{user?.full_name}!</strong></h1>
      <p className="text-gray-500 text-xl mt-1 ">
        Bem-vindo ao painel de administração.
      </p>
    </div>
  );
};

export default DashboardHome;
