import { Pizza } from "lucide-react"
import { Link } from "react-router-dom"

import api from "../services/api"

import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import Input from "../components/Input"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signUpSchema = z.object({
  username: z.string().min(6, "O nome de usuário deve ter pelo menos 6 caracteres"),
  fullName: z.string().min(1, "O nome completo é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação da senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem!",
  path: ["confirmPassword"]
})

type SignUpForm = z.infer<typeof signUpSchema>

const SignUp = () => {

  useEffect(() => {
    document.title = "Cadastro | Pizza Express"
    
    const getUser = async () => {
      const res = await api.get("/auth/me", {withCredentials: true})
      if (res.status === 200) {
        navigate("/")
      }
    }

    getUser()
  }, [])


  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async(data: SignUpForm) => {
    try {
      setIsLoading(true)
      const res = await api.post("/users/", {
        "username": data.username,
        "full_name": data.fullName,
        "password": data.password
      })

      if (res.status === 201) {
        navigate(`/auth/success/${data.username}`)
      }

      console.log(res.data)

    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("username", { type: "manual", message: "Nome de usuário já existe!" })
      }

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-2 md:max-w-[512px] w-full bg-gray-50 shadow-2xl shadow-gray-400 rounded-xl p-6" onSubmit={handleSubmit(onSubmit)}>

      <div>
        <div className="w-full flex items-center justify-center hover:transform hover:scale-110 transition-transform duration-200">
          <div className="max-w-[62px] p-4 rounded-full bg-orange-500">
            <Pizza size={30} className="text-white cursor-pointer"/>
          </div>
        </div>
        <h1 className="text-center text-2xl font-semibold">Pizza Express</h1>
        <p className="text-center py-3">Crie sua conta para pedir sua pizza🍕</p>
      </div>

      <div className="flex flex-col w-full gap-2">

        <label htmlFor="username">Nome de usuário</label>
        <Input type="text" id="username" placeholder="Digite seu nome de usuário" {...register("username")} />
        {errors.username && <span className="text-red-500 font-semibold text-sm">{errors.username.message}</span>}

        <label htmlFor="fullName">Nome completo</label>
        <Input type="text" id="fullName" placeholder="Seu nome completo" {...register("fullName")} />
        {errors.fullName && <span className="text-red-500 font-semibold text-sm">{errors.fullName.message}</span>}

        <label htmlFor="password">Senha</label>
        <Input type="password" id="password" placeholder="Digite sua senha" {...register("password")} />
        {errors.password && <span className="text-red-500 font-semibold text-sm">{errors.password.message}</span>}

        <label htmlFor="confirmPassword">Confirme sua senha</label>
        <Input type="password" id="confirmPassword" placeholder="Confirme sua senha" {...register("confirmPassword")} />
        {errors.confirmPassword && <span className="text-red-500 font-semibold text-sm">{errors.confirmPassword.message}</span>}
        
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <Spinner className="size-5 text-orange-500"/>
          </div>
        ) 
        : <button type="submit" className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear mt-5">Criar conta</button>}
      </div>

      <p className="text-center mt-2">
        <span>
          Já possui uma conta?
          <Link className="text-orange-500 font-bold ml-1 hover:opacity-85 transition ease-linear" to="/auth/signin">Entrar</Link>
        </span>
      </p>
    </form>
  )
}

export default SignUp