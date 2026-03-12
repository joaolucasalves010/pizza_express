import { useEffect } from "react";
import { Pizza, PlusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { Toaster } from "sonner";
import { toast } from "sonner";

const createProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  price: z.string().min(1, "O preço é obrigatório").refine((val) => parseFloat(val) > 0, "O preço deve ser superior a zero"),
  description: z.string().min(20, "O minimo é 20").max(255, "O máximo é 255"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "A imagem é obrigatória")
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

const CreateProduct = () => {

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

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const product = {
        "name": data.name,
        "description": data.description,
        "price": data.price,
      }
      const res = await api.post("/products/", product, {withCredentials: true})
      const formData = new FormData()
      formData.append("file", data.image[0])

      api.post(`/products/${res.data.product_id}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      toast.success("Produto criado com sucesso!")

    } catch (err: any) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col bg-gray-200">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white shadow-2xl shadow-zinc-700 rounded-2xl p-8 border border-zinc-400">
          <div className="flex justify-center items-center">
            <div className="bg-orange-500 w-full rounded-full p-4 max-w-[62px]">
              <Pizza size={30} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-center mb-6">
            Cadastrar Novo Produto
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Nome do Produto</label>
              <input
                type="text"
                placeholder="Ex: Pizza Calabresa"
                className="border border-zinc-500 p-3 rounded-xl focus:outline-orange-500"
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
                className="border p-3 rounded-xl focus:outline-orange-500 border-zinc-500"
                {...register("price")}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Imagem</label>
              <input
                type="file"
                accept="image/*"
                className="border border-zinc-500 p-2 rounded-xl file:bg-orange-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
                {...register("image")}
              />
              {errors.image && <span className="text-red-500 text-sm">{errors.image.message as string}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Descrição</label>
              <textarea
                placeholder="Descreva os ingredientes ou características do produto..."
                className="border p-3 rounded-xl focus:outline-orange-500 resize-none border-zinc-500"
                rows={4}
                {...register("description")}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-orange-500 text-white py-3 rounded-xl mt-4 hover:opacity-85 transition duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle />
              Cadastrar Produto
            </button>
          </form>
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default CreateProduct;
