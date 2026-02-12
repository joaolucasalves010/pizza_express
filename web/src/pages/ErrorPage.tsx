import React from 'react'

import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const navigate = useNavigate()

  return (
    <div className="bg-orange-100 min-h-screen text-center">
      <main className='p-3 w-full flex justify-center items-center min-h-screen'>
        <div className='bg-gray-50 p-6 shadow-2xl shadow-gray-400'>
          <div className='w-full flex items-center justify-center'>
            <div className='max-w-[90px] bg-red-500 rounded-full p-4'>
              <X size={50} className='text-white' />
            </div>
          </div>
            <h1 className='text-3xl font-semibold'>Oops!</h1>
            <p className='max-w-[400px]'>Algo de errado aconteceu com a página que você tentou acessar. Essa página não existe ou pode ter sido movida, clique no botão abaixo para voltar.</p>
            <button onClick={() => navigate(-1)} className='bg-orange-500 rounded-xl p-3 text-white cursor-pointer hover:opacity-80 duration-200 ease-linear my-5 w-full text-center'>
              Voltar
            </button>
        </div> 
      </main>
    </div>
  )
}

export default ErrorPage