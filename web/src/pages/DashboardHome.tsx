import { Card } from "@/components/ui/card";
import UsersTable from "@/components/UsersTable";
import { UserContext } from "@/contexts/UserContext";
import { BadgeDollarSign, DollarSign, User, UserCheck } from "lucide-react";
import { useContext } from "react";

const DashboardHome = () => {

  const { user } = useContext(UserContext)!

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl">Olá, <strong>{user?.full_name}!</strong></h1>
      <p className="text-gray-500 text-xl mt-1 ">
        Bem-vindo ao painel de administração.
      </p>
      <div className="flex gap-6 flex-col md:flex md:flex-col lg:grid lg:grid-cols-3 p-6 lg:gap-6 w-full">
        <Card className="py-4 bg-green-500 text-white shadow-lg shadow-green-400 border-none">
          <div className="py-2">
            <div className="flex items-center gap-2 justify-center">
              <BadgeDollarSign  size={30}/>
              <p className="text-lg uppercase font-semibold">Receita Total</p>
            </div>
            <div className="flex items-center gap-1 justify-center font-semibold">
              <DollarSign />
              <p className="text-xl">
                12000.00
              </p>
            </div>
          </div>
        </Card>
        <Card className="py-4 shadow-lg shadow-orange-400 bg-orange-500 text-white border-none">
          <div className="py-2">
            <div className="flex items-center gap-2 justify-center">
              <User  size={30}/>
              <p className="text-lg uppercase font-semibold">Usuários totais</p>
            </div>
            <p className="text-center text-xl font-semibold">1200</p>
          </div>
        </Card>
        <Card className="py-4 shadow-lg shadow-blue-400 bg-blue-600 text-white border-none">
          <div className="py-2">
            <div className="flex items-center gap-2 justify-center">
              <UserCheck  size={30}/>
              <p className="text-lg uppercase font-semibold">Usuários ativos</p>
            </div>
            <p className="text-center text-xl font-semibold">120</p>
          </div>
        </Card>
      </div>
      <UsersTable />
    </div>
  );
};

export default DashboardHome;
