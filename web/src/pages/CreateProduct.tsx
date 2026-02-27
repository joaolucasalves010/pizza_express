import React from "react";
import { useState, useEffect } from "react";

import Footer from "../components/Footer";
import { User } from "lucide-react";

const CreateProduct = () => {

  useEffect(() => {
    document.title = "Cadastrar Produto"
  }, [])

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      price,
      image,
      description,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-100">

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white shadow-2xl shadow-black-300 rounded-2xl p-8">
          
          <div className="flex justify-center items-center">
            <div className="bg-orange-500 w-full rounded-full p-4 max-w-[62px]">
              <User size={30} className="text-white"/>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-center mb-6">
            Cadastrar Novo Produto
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="font-medium">Nome do Produto</label>
              <input
                type="text"
                placeholder="Ex: Pizza Calabresa"
                className="border p-3 rounded-xl focus:outline-orange-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Preço</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ex: 39.90"
                className="border p-3 rounded-xl focus:outline-orange-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Imagem</label>
              <input
                type="file"
                accept="image/*"
                className="border p-2 rounded-xl file:bg-orange-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Descrição</label>
              <textarea
                placeholder="Descreva os ingredientes ou características do produto..."
                className="border p-3 rounded-xl focus:outline-orange-500 resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white py-3 rounded-xl mt-4 hover:opacity-85 transition duration-200 font-semibold"
            >
              Cadastrar Produto
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateProduct;