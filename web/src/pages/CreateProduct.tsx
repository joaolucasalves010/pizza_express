import { useEffect } from "react";
import Footer from "../components/Footer";
import { User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const createProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  price: z.string().min(1, "O preço é obrigatório").refine((val) => parseFloat(val) > 0, "O preço deve ser superior a zero"),
  description: z.string().min(1, "A descrição é obrigatória"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "A imagem é obrigatória")
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

const CreateProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastrar Produto";

  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: CreateProductFormData) => {
    console.log({
      name: data.name,
      price: data.price,
      image: data.image[0],
      description: data.description,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-100">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white shadow-2xl shadow-black-300 rounded-2xl p-8 relative">
          <div className="flex justify-center items-center">
            <div className="bg-orange-500 w-full rounded-full p-4 max-w-[62px]">
              <User size={30} className="text-white" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-400 hover:scale-102 absolute top-3 left-4 p-2 text-black hover:bg-zinc-400 cursor-pointer rounded-full transition"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-3xl font-semibold text-center mb-6">
            Cadastrar Novo Produto
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Nome do Produto</label>
              <input
                type="text"
                placeholder="Ex: Pizza Calabresa"
                className="border p-3 rounded-xl focus:outline-orange-500"
                {...register("name")}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Preço</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ex: 39.90"
                className="border p-3 rounded-xl focus:outline-orange-500"
                {...register("price")}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Imagem</label>
              <input
                type="file"
                accept="image/*"
                className="border p-2 rounded-xl file:bg-orange-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
                {...register("image")}
              />
              {errors.image && <span className="text-red-500 text-sm">{errors.image.message as string}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Descrição</label>
              <textarea
                placeholder="Descreva os ingredientes ou características do produto..."
                className="border p-3 rounded-xl focus:outline-orange-500 resize-none"
                rows={4}
                {...register("description")}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
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
