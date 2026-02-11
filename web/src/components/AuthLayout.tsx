import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='bg-orange-100 min-h-screen'>
      <main className='p-3 w-full flex justify-center items-center py-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout