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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-start sm:items-center justify-center p-4 sm:p-6 py-8">
        <div className="w-full max-w-xl bg-white shadow-lg sm:shadow-2xl sm:shadow-zinc-700 rounded-2xl p-5 sm:p-8 border border-zinc-200 sm:border-zinc-400">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-orange-500 rounded-full p-3 sm:p-4">
              <Pizza size={26} className="text-white" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-5 sm:mb-6">
            Cadastrar Novo Produto
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm sm:text-base">Nome do Produto</label>
              <input
                type="text"
                placeholder="Ex: Pizza Calabresa"
                className="w-full border border-zinc-500 p-3 rounded-xl focus:outline-orange-500 text-sm sm:text-base"
                {...register("name")}
              />
              {errors.name && <span className="text-red-500 text-xs sm:text-sm">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm sm:text-base">Preço</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ex: 39.90"
                className="w-full border p-3 rounded-xl focus:outline-orange-500 border-zinc-500 text-sm sm:text-base"
                {...register("price")}
              />
              {errors.price && <span className="text-red-500 text-xs sm:text-sm">{errors.price.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm sm:text-base">Imagem</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-zinc-500 p-2 rounded-xl text-sm sm:text-base
                  file:bg-orange-500 file:text-white file:border-none
                  file:px-3 file:py-1.5 sm:file:px-4 sm:file:py-2
                  file:rounded-lg file:cursor-pointer file:text-xs sm:file:text-sm
                  file:mr-3"
                {...register("image")}
              />
              {errors.image && <span className="text-red-500 text-xs sm:text-sm">{errors.image.message as string}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm sm:text-base">Descrição</label>
              <textarea
                placeholder="Descreva os ingredientes ou características do produto..."
                className="w-full border p-3 rounded-xl focus:outline-orange-500 resize-none border-zinc-500 text-sm sm:text-base"
                rows={4}
                {...register("description")}
              />
              {errors.description && <span className="text-red-500 text-xs sm:text-sm">{errors.description.message}</span>}
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-orange-500 text-white py-3 rounded-xl mt-2 sm:mt-4 hover:opacity-85 transition duration-200 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base w-full"
            >
              <PlusCircle size={18} />
              Cadastrar Produto
            </button>
          </form>
        </div>
      </main>

      <Toaster position="bottom-right"/>
    </div>
  );
};

export default CreateProduct;
