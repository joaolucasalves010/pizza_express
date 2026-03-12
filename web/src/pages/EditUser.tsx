import Input from "@/components/Input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "@/contexts/UserContext"

import api from "@/services/api"
import { Camera, ArrowLeft } from "lucide-react"

import defaultUserImage from "@/assets/user_default.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Toaster } from "sonner"
import { toast } from "sonner"
import useGetUser from "@/hooks/useGetUser"

import { Spinner } from "@/components/ui/spinner"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const editUserSchema = z.object({
  username: z.string().min(6, "O nome de usuário deve ter pelo menos 6 caracteres").optional().or(z.literal('')),
  fullName: z.string().min(10, "O nome completo deve ter pelo menos 10 caracteres").optional().or(z.literal('')),
  password: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres").optional().or(z.literal('')),
  image: z.any()
    .refine((files) => !files?.[0] || files?.[0]?.size <= MAX_FILE_SIZE, `Tamanho máximo de 5MB.`)
    .refine(
      (files) => !files?.[0] || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Apenas formatos .jpg, .jpeg, .png e .webp são suportados."
    ).optional(),
})

type EditUserForm = z.infer<typeof editUserSchema>

const EditUser = () => {

  const { user, setUser } = useContext(UserContext)!
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { getUser } = useGetUser()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema)
  })

  useEffect(() => {
    document.title = "Editar Perfil | Pizza Express"

    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      if (user.username) setValue("username", user.username)
      if (user.full_name) setValue("fullName", user.full_name)
      if (user.image_url) {
        setPreviewUrl(user.image_url)
      }
    }
  }, [user, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

const onSubmit = async (data: EditUserForm) => {
  try {
    setIsLoading(true)
    if (data.image?.[0]) {
      const formData = new FormData()
      formData.append("file", data.image[0])
      await api.post(`users/${user?.id}/images`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      })
    }

    const userUpdate = {
      full_name: data.fullName || user?.full_name,
      username: data.username || user?.username,
      password: data.password,
    }

    const res = await api.patch(`users/${user?.id}`, userUpdate, { withCredentials: true })
    if (res.status === 200) {
      toast.success("Perfil atualizado! Redirecionando para login...")

      setTimeout(async() => {
        await api.get("/logout", {withCredentials: true})
        setUser(null)
        navigate("/auth/signin")
      }, 5000)

    }
  } catch (err) {
    console.error(err)
  } finally {
    setIsLoading(false)
  }
}

  const { ref: registerImageRef, ...registerImageRest } = register("image");

  return (
    <main className="flex items-center justify-center min-h-screen bg-orange-100 p-4 font-sans">
      <div className="w-full max-w-lg bg-zinc-200 shadow-2xl rounded-3xl overflow-hidden relative">
        <form className="p-8 flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
          
          <button type="button" onClick={() => navigate(-1)} className="border border-gray-400 hover:scale-102 absolute top-4 left-4 p-2 text-black hover:bg-zinc-400 cursor-pointer rounded-full transition">
             <ArrowLeft size={20} />
          </button>

          <div className="relative mb-2 mt-4 flex flex-col items-center">
            
            <div className="relative" onClick={() => fileInputRef.current?.click()}>
              {previewUrl && previewUrl !== user?.image_url ? (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 cursor-pointer group relative shadow-lg">
                  <img src={previewUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </div>
                </div>
              ) : user?.image_url ? (
                <div className="relative group cursor-pointer shadow-lg rounded-full border-4 border-white overflow-hidden w-24 h-24 sm:w-32 sm:h-32">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src={`http://localhost:8000${user?.image_url}`}
                      alt="@user"
                      className="object-cover"
                    />
                    <AvatarFallback>@{user.username}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </div>
                </div>
              ) : (
                <div className="relative group cursor-pointer shadow-lg rounded-full border-4 border-white overflow-hidden w-24 h-24 sm:w-32 sm:h-32">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src={defaultUserImage}
                      alt="@user"
                      className="grayscale object-cover"
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </div>
                </div>
              )}
            </div>

            <input 
              id="image-upload"
              type="file" 
              accept={ACCEPTED_IMAGE_TYPES.join(",")} 
              className="hidden" 
              {...registerImageRest}
              ref={(e) => {
                registerImageRef(e)
                fileInputRef.current = e
              }}
              onChange={(e) => {
                registerImageRest.onChange(e)
                handleImageChange(e)
              }}
            />
          </div>
          
          <div className="w-full text-center mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Editar Perfil</h1>
            <p className="text-gray-500 mt-1">Atualize seus dados e sua foto de perfil</p>
          </div>

          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm font-semibold text-gray-700">Nome de usuário</label>
              <Input type="text" id="username" placeholder="Digite seu novo nome de usuário" {...register("username")} className="bg-gray-50 px-4 py-3 border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl transition-all" />
              {errors.username && <span className="text-red-500 font-semibold text-xs">{errors.username.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Nome completo</label>
              <Input type="text" id="fullName" placeholder="Seu nome completo" {...register("fullName")} className="bg-gray-50 px-4 py-3 border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl transition-all" />
              {errors.fullName && <span className="text-red-500 font-semibold text-xs">{errors.fullName.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">Nova Senha (Opcional)</label>
              <Input type="password" id="password" placeholder="Sua nova senha" {...register("password")} className="bg-gray-50 px-4 py-3 border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl transition-all" />
              {errors.password && <span className="text-red-500 font-semibold text-xs">{errors.password.message as string}</span>}
            </div>

            {errors.image && <span className="text-red-500 font-semibold text-xs text-center">{errors.image.message as string}</span>}
            
            {isLoading ? (
              <div className="flex justify-center mt-5">
                <Spinner className="size-5 text-orange-500"/>
              </div>
            ) : (
              <button type="submit" className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl py-3 mt-2 shadow flex items-center justify-center transition-colors hover:scale-102 ease-linear">
                Salvar Alterações
              </button>
            )}
          </div>
        </form>
      </div>
      <Toaster />
    </main>
  )
}

export default EditUser