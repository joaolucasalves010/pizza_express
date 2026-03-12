import { User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"

import api from "../services/api"

import Input from "../components/Input"
import { Spinner } from "@/components/ui/spinner"

import { UserContext } from "@/contexts/UserContext";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signInSchema = z.object({
  username: z.string().min(6, "O nome de usuário deve ter pelo menos 6 caracteres"),
  password: z.string().min(1, "A senha é obrigatória")
})

type SignInForm = z.infer<typeof signInSchema>

const SignIn = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Login | Pizza Express"
    
    const getUser = async () => {
      const res = await api.get("/auth/me", {withCredentials: true})
      if (res.status === 200) {
        navigate("/")
      }
    }

    getUser()
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async(data: SignInForm) => {
    try {
      setIsLoading(true)
      const res = await api.post("/auth/login", {
        "username": data.username,
        "password": data.password,
      }, {withCredentials: true})
      
      console.log(res.data)

      navigate("/")
    } catch (err: any) {
      console.log(err)
      setError("password", { type: "manual", message: "Credenciais inválidas ou erro no servidor" })
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <form className="flex flex-col gap-2 md:max-w-[512px] w-full bg-gray-50 shadow-2xl shadow-gray-400 rounded-xl p-6" onSubmit={handleSubmit(onSubmit)}>

      <div>
        <div className="w-full flex items-center justify-center hover:transform hover:scale-110 transition-transform duration-200">
          <div className="max-w-[62px] p-4 rounded-full bg-orange-500 cursor-pointer">
            <User size={30} className="text-white"/>
          </div>
        </div>
        <h1 className="text-center text-2xl font-semibold">Pizza Express</h1>
        <p className="text-center py-3">Faça login para acessa a página de pedidos😋</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="username">Nome de usuário</label>
        <Input type="text" id="username" placeholder="Digite seu nome de usuário" {...register("username")} />
        {errors.username && <span className="text-red-500 font-semibold text-sm">{errors.username.message}</span>}

        <label htmlFor="password">Senha</label>
        <Input type="password" id="password" placeholder="Digite sua senha" {...register("password")} />
        {errors.password && <span className="text-red-500 font-semibold text-sm">{errors.password.message}</span>}

        {isLoading ? (
          <div className="flex justify-center mt-5">
            <Spinner className="size-5 text-orange-500"/>
          </div>
        ) : <button type="submit" className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear mt-5">Entrar</button>}
      </div>

      <p className="text-center mt-2">
        <span>
          Não possui uma conta?
          <Link className="text-orange-500 font-bold ml-1 hover:opacity-85 transition ease-linear" to="/auth/signup">Cadastrar-se</Link>
        </span>
      </p>
    </form>
  )
}

export default SignIn