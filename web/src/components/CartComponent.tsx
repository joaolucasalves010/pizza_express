import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

const CartComponent = () => {

  const { order } = useContext(CartContext)!

  return (
    <div className="flex items-center gap-2 sm:bg-amber-400 p-2 rounded-xl sm:text-black cursor-pointer hover:opacity-95 hover:scale-102 duration-200">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2">
            <ShoppingCart
              size={25}
              className="hover:scale-105 ease-linear duration-110"
            />
            <span className="text-bold hidden sm:block">Carrinho</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center">
              <div className="bg-orange-400 p-4 w-15 h-15 flex items-center justify-center rounded-full">
                <ShoppingCart  size={30} className="text-white"/>
              </div>
            </div>
            <DialogTitle className="text-xl uppercase tracking-[2px] font-semibold my-2">
              Carrinho
            </DialogTitle>
            <DialogDescription>
              Seu pedido
            </DialogDescription>
            <hr className="bg-zinc-400"/>
            <div>
              {order.map((item) => (
                <h1>{item.name}</h1>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartComponent;
