import { Pizza } from "lucide-react"

const SignUp = () => {
  return (
    <form className="flex flex-col gap-2 md:max-w-[512px] w-full bg-gray-50 shadow-2xl shadow-gray-400 rounded-xl p-6">

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
        <label htmlFor="fullName">Nome completo</label>
        <input type="text" id="fullName" placeholder="João Lucas Lima Alves" className="border p-2 rounded-xl outline-none"/>
                
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="exemplo@gmail.com" className="border p-2 rounded-xl" />

        <label htmlFor="password">Senha</label>
        <input type="password" placeholder="******" className="border p-2 rounded-xl" />

        <label htmlFor="confirmPassword">Confirme sua senha:</label>
        <input type="password" id="confirmPassword" placeholder="******" className="border p-2 rounded-xl"/>    
          
        <button type="submit" className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear mt-5">Criar conta</button>
      </div>

      <p className="text-center">
        <span>
          Já possui uma conta?
          <a href="/signin" className="text-orange-500 font-bold"> Entrar</a>
        </span>
      </p>
    </form>
  )
}

export default SignUp