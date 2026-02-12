import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const AuthLayout = () => {
  return (
    <div className='bg-orange-100 min-h-screen'>
      <main className='p-3 w-full flex justify-center min-h-screen items-center py-5'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default AuthLayout