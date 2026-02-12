import { Pizza } from "lucide-react"
import { Link } from "react-router-dom"
import { Spinner } from "../components/Spinner"

import api from "../services/api"

import { useState } from "react"


const SignUp = () => {

  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [usernameExists, setUsernameExists] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError(true)
      return
    }

    try {
      setIsLoading(true)
      const res = await api.post("/users/", {
        "username": username,
        "full_name": fullName,
        "password": password
      })

    } catch (err: any) {
      if (err.response?.status === 409) {
        setUsernameExists(true)
      }

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-2 md:max-w-[512px] w-full bg-gray-50 shadow-2xl shadow-gray-400 rounded-xl p-6" onSubmit={handleSubmit}>

      <div>
        <div className="w-full flex items-center justify-center hover:transform hover:scale-110 transition-transform duration-200 cursor-pointer">
          <div className="max-w-[62px] p-4 rounded-full bg-orange-500">
            <Pizza size={30} className="text-white"/>
          </div>
        </div>
        <h1 className="text-center text-2xl font-semibold">Pizza Express</h1>
        <p className="text-center py-3">Crie sua conta para pedir sua pizza🍕</p>
      </div>

      <div className="flex flex-col w-full gap-2">

        <label htmlFor="username">Nome de usuário</label>
        <input type="text" id="username" placeholder="joaolucasalves010" className="border p-2 rounded-xl focus:outline-orange-500" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        {usernameExists && <span className="text-red-500 font-semibold">Nome de usuário já existe!</span>}

        <label htmlFor="fullName">Nome completo</label>
        <input type="text" id="fullName" placeholder="João Lucas Lima Alves" className="border p-2 rounded-xl focus:outline-orange-500" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>

        <label htmlFor="password">Senha</label>
        <input type="password" placeholder="******" className="border p-2 rounded-xl focus:outline-orange-500" minLength={6} onChange={(e) => setPassword(e.target.value)} value={password} required />

        <label htmlFor="confirmPassword">Confirme sua senha</label>
        <input type="password" id="confirmPassword" placeholder="******" className="border p-2 rounded-xl focus:outline-orange-500" minLength={6} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required/>
        {passwordError && <span className="text-red-500 font-semibold">As senhas não coincidem!</span>}
        
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <Spinner />
          </div>
        ) 
        : <button type="submit" className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear mt-5">Criar conta</button>}
      </div>

      <p className="text-center">
        <span>
          Já possui uma conta?
          <Link className="text-orange-500 font-bold ml-1 hover:opacity-85 transition ease-linear" to="/auth/signin">Entrar</Link>
        </span>
      </p>
    </form>
  )
}

export default SignUp