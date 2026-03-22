import api from "../services/api";
import type { Product } from "../types/Product";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingPage from "./LoadingPage";

import { useEffect, useState } from "react";

import { ShoppingCart } from "lucide-react";

import useGetUser from "@/hooks/useGetUser";

import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

import { z } from "zod";
import Input from "@/components/Input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({ productQuantity: z.number().min(0) });

type ProductForm = z.infer<typeof productSchema>;

const Home = () => {
  const { register, setValue, getValues } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const { getUser } = useGetUser();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Pizza Express | Home";

    setIsLoading(true);

    const getProducts = async () => {
      try {
        const res = await api.get("/products/");

        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
    getProducts();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const { setOrder } = useContext(CartContext)!;

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />

      <main className="flex-1">
        <div className="p-8 flex flex-col text-center">
          <h1 className="text-xl lg:text-4xl md:text-4xl font-bold">
            A melhor pizza da cidade entregue na sua porta.
          </h1>

          <p className="lg:text-lg md:text-lg text-gray-600 mt-2">
            Massa artesanal, ingredientes frescos e entrega rápida.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-xl lg:text-3xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            Cardápio
          </h1>

          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 w-full max-w-4xl mx-auto my-4 hover:scale-102"
              id="cardapio"
            >
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
                          className="border border-gray-400 p-2 rounded-l-lg cursor-pointer"
                          onClick={() => {
                            const value = Number(getValues("productQuantity"));
                            if (value == 0) return;
                            setValue("productQuantity", value - 1);
                          }}
                        >
                          -
                        </button>
                        <Input
                          placeholder="0"
                          type="text"
                          className="rounded-none w-[90px] lg:w-[100px] md:w-[100px] text-center"
                          {...register("productQuantity")}
                        />
                        <button
                          className="border border-gray-400 p-2 rounded-r-lg cursor-pointer"
                          onClick={() => {
                            const value = Number(getValues("productQuantity"));
                            setValue("productQuantity", value + 1);
                          }}
                        >
                          +
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
                              return prevState.map(
                                (
                                  item,
                                ) =>
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
            </div>
          ))}
          {products.length == 0 && (
            <div>
              <p className="lg:text-lg md:text-lg">
                Nenhum produto encontrado!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
