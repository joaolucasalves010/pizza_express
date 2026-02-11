import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='w-screen h-screen bg-orange-100'>
      <main className='p-3 w-full h-screen flex justify-center items-center'>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout