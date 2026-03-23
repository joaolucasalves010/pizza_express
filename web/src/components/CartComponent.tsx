import { ShoppingCart, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

const CartComponent = () => {
  const { order, totalItems, setOrder, totalValue } = useContext(CartContext)!;

  return (
    <div className="flex items-center gap-2 sm:bg-amber-400 p-2 rounded-xl sm:text-black cursor-pointer hover:opacity-95 hover:scale-102 duration-200">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2">
            <ShoppingCart
              size={25}
              className="hover:scale-105 ease-linear duration-110"
            />
            <span className="text-bold hidden sm:block">Carrinho ({totalItems})</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center">
              <div className="bg-orange-400 p-4 w-15 h-15 flex items-center justify-center rounded-full">
                <ShoppingCart size={30} className="text-white" />
              </div>
            </div>
            <DialogTitle className="text-lg my-2 text-center">
              <p className="uppercase font-bold tracking-wide text-zinc-600">Carrinho</p>
              {totalItems == 1 ? (
                <p className="font-semibold text-zinc-400">{totalItems} item</p>
              ) : (
                <p className="font-semibold text-zinc-400">{totalItems} itens</p>
              )}
            </DialogTitle>
          </DialogHeader>
          <hr />
          {order.length > 0 ? (
            <div className="flex flex-col gap-2">
              {order.map((item, index) => (
                <div
                  key={index}
                  className="border bg-zinc-100 shadow-lg border-zinc-200 rounded-xl p-2 lg:p-4 md:p-4 flex items-center gap-2"
                >
                  <img
                    src={`http://localhost:8000${item.image_url}`}
                    className="w-15 h-15 rounded-xl"
                  />
                  <div className="flex gap-1 flex-col">
                    <h1 className="text-[16px] font-semibold">
                      {item.quantity}x - {item.name}
                    </h1>
                    <p className="text-sm">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mx-auto">
                  </div>
                  <button className="cursor-pointer p-2" onClick={() => {
                    setOrder((prev) => prev.filter((_, i) => i !== index));
                  }}>
                    <Trash/>
                  </button>
                </div>
              ))}
              <hr />
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Total</p>
                <span className="font-semibold text-lg p-2">R$ {totalValue.toFixed(2)}</span>
              </div>
              <button className="w-full flex items-center justify-center bg-orange-400 p-4 rounded-xl text-white font-semibold hover:scale-102 hover:bg-orange-300 duration-300 cursor-pointer">Finalizar pedido</button>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <ShoppingCart className="text-zinc-400" size={40}/>
              <p className="text-center text-zinc-400">
                Nenhum produto encontrado!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartComponent;
