import React from 'react'

import { CheckCircle } from 'lucide-react'

import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const AccountCreationSuccess = () => {

  let params = useParams()

  return (
    <div className="bg-gray-50 rounded-2xl p-3 shadow-2xl shadow-gray-400">
      <div className="flex flex-col justify-center items-center p-3">
        <div>
          <CheckCircle size={90}  className='text-green-600'/>
        </div>
        {<h1 className='text-xl font-semibold mt-2'>Parabéns {params.username}</h1>}
        <h2 className="text-lg text-center mb-2 font-medium">Sua conta foi criada com sucesso!</h2>
        <p className='max-w-[400px] text-gray-500 text-center'>Clique no botão abaixo para ser redirecionado para a página de login e acessar o nosso site de delivery.</p>
        <Link to={"/auth/signin"} className='bg-orange-500 rounded-xl p-3 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear my-5 w-full text-center'>Login</Link>
      </div>
    </div>
  )
}

export default AccountCreationSuccess