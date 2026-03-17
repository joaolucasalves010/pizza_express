import api from "../services/api";
import type { Product } from "../types/Product";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingPage from "./LoadingPage";

import {  useEffect, useState } from "react";

import  { ShoppingCart } from "lucide-react"

import useGetUser from "@/hooks/useGetUser";

import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

const Home = () => {

  const { getUser } = useGetUser()

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    document.title = "Pizza Express | Home"

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

    getUser()
    getProducts();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

   const { setOrder } = useContext(CartContext)!
   
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
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Imagem */}
                <img
                  src={`http://localhost:8000${product.image_url}`}
                  alt={product.name}
                  className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-xl flex-shrink-0"
                />

                {/* Conteúdo */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {index + 1} - {product.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-red-600">
                      R$ {Number(product.price).toFixed(2)}
                    </span>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 hover:scale-102 duration-300 cursor-pointer" onClick={() => setOrder((prevState) => [...prevState, product])}>
                      <ShoppingCart />
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {products.length == 0 && (
            <div>
              <p className="lg:text-lg md:text-lg">Nenhum produto encontrado!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
