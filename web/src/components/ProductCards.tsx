import type { Product } from "@/types/Product";
import { ShoppingCart, Minus, Plus } from "lucide-react";

import Input from "./Input";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";


type ProductCardsProps = {
  product: Product
  index: number;
};

const productSchema = z.object({ productQuantity: z.number().min(0) });

type ProductForm = z.infer<typeof productSchema>;

const ProductCards = ({ product, index }: ProductCardsProps) => {

  const { register, setValue, getValues } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const { setOrder } = useContext(CartContext)!

  return (
    <form
      className="flex flex-col sm:flex-row gap-4"
      onClick={(e) => e.preventDefault()}
    >
      <img
        src={`http://localhost:8000${product.image_url}`}
        alt={product.name}
        className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-xl flex-shrink-0"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {index + 1} - {product.name}
          </h2>

          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            {product.description}
          </p>

          <span className="text-lg font-bold text-red-600 lg:hidden md:hidden">
            R$ {Number(product.price).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-red-600 hidden lg:flex md:flex">
            R$ {Number(product.price).toFixed(2)}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex">
              <button
                className="border p-2 rounded-l-lg cursor-pointer border-orange-400 bg-orange-400 text-white"
                onClick={() => {
                  const value = Number(getValues("productQuantity"));
                  if (value == 0) return;
                  setValue("productQuantity", value - 1);
                }}
              >
                <Minus size={15} />
              </button>
              <Input
                placeholder="0"
                type="text"
                className="rounded-none w-[90px] lg:w-[100px] md:w-[100px] text-center border-orange-400 border-2 outline-none font-bold text-orange-400"
                {...register("productQuantity")}
              />
              <button
                className="border border-orange-400 bg-orange-400 text-white p-2 rounded-r-lg cursor-pointer"
                onClick={() => {
                  const value = Number(getValues("productQuantity"));
                  setValue("productQuantity", value + 1);
                }}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 hover:scale-102 duration-300 cursor-pointer"
              onClick={() => {
                const value = Number(getValues("productQuantity"));
                if (value <= 0) return;

                setOrder((prevState) => {
                  const existingItem = prevState.find(
                    (item) => item.name == product.name,
                  );

                  if (existingItem) {
                    return prevState.map((item) =>
                      item.name === product.name
                        ? {
                            ...item,
                            quantity: item.quantity + value,
                          }
                        : item,
                    );
                  }

                  return [
                    ...prevState,
                    {
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      image_url: product.image_url,
                      quantity: value,
                    },
                  ];
                });
              }}
            >
              <ShoppingCart />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductCards;
