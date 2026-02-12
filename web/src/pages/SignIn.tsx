import { User } from "lucide-react"
import { Link } from "react-router-dom"
import React from "react"

import { useState} from "react"

import api from "../services/api"

const SignIn = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) return

    console.log(username, password)

    try {
      const res = await api.post("/auth/login", {
        "username": username,
        "password": password
      })

      if (res.status != 200) {
        console.log("")
      }

      console.log(res.data)
    } catch (err: any) {
      console.log(err)
    }

  }

  return (
    <form className="flex flex-col gap-2 md:max-w-[512px] w-full bg-gray-50 shadow-2xl shadow-gray-400 rounded-xl p-6" onSubmit={handleSubmit}>

      <div>
        <div className="w-full flex items-center justify-center hover:transform hover:scale-110 transition-transform duration-200 cursor-pointer">
          <div className="max-w-[62px] p-4 rounded-full bg-orange-500">
            <User size={30} className="text-white"/>
          </div>
        </div>
        <h1 className="text-center text-2xl font-semibold">Pizza Express</h1>
        <p className="text-center py-3">Faça login para acessa a página de pedidos😋</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="username">Nome de usuário</label>
        <input type="text" id="username" placeholder="joaolucasalves010" className="border p-2 rounded-xl outline-none" onChange={(e) => setUsername(e.target.value)}/>

        <label htmlFor="password">Senha</label>
        <input type="password" placeholder="******" className="border p-2 rounded-xl outline-none" onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit" className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear mt-5">Entrar</button>
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