import { User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect } from "react"

import { useState} from "react"

import api from "../services/api"

import Input from "../components/Input"
import { Spinner } from "@/components/ui/spinner"

const SignIn = () => {

  useEffect(() => {
    document.title = "Login | Pizza Express"
  }, [])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) return

    try {
      setIsLoading(true)
      const res = await api.post("/auth/login", {
        "username": username,
        "password": password
      })

      if (res.status != 200) {
        console.log("Algo deu de errado")
      }

      console.log(res.data)

      navigate("/")
    } catch (err: any) {
      console.log(err)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <form className="flex flex-col gap-2 md:max-w-[512px] w-full bg-gray-50 shadow-2xl shadow-gray-400 rounded-xl p-6" onSubmit={handleSubmit}>

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
        <Input type="text" id="username" placeholder="Digite seu nome de usuário" value={username} required onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Senha</label>
        <Input type="password" placeholder="Digite sua senha" value={password} required onChange={(e) => setPassword(e.target.value)} />

        {isLoading ? (
          <div className="flex justify-center mt-5">
            <Spinner className="size-5 text-orange-500"/>
          </div>
        ) : <button type="submit" className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear mt-5">Entrar</button>}
      </div>

      <p className="text-center">
        <span>
          Não possui uma conta?
          <Link className="text-orange-500 font-bold ml-1 hover:opacity-85 transition ease-linear" to="/auth/signup">Cadastrar-se</Link>
        </span>
      </p>
    </form>
  )
}

export default SignIn