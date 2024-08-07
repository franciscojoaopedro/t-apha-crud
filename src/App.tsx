import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import useAuth from './hooks/useAuth'


function App() {

  const {logOut,isSession}=useAuth()

  
  

  return (
  
  <>
  <header className='w-full h-20  flex px-12 items-center  justify-between    '  >
      <div  className='px-7 py-2  bg-gray-900 rounded ' >
        <h3 className='text-white font-bold ' >Loja</h3>
      </div>
      <nav>
        <ul className='flex gap-4'   >
          <li className='w-full bg-slate-50  flex justify-center items-center gap-2   cursor-pointer  rounded-lg  font-semibold shadow-md p-3 '  ><Link to="/">Home</Link></li>
          <li className='w-full bg-slate-50  flex justify-center items-center gap-2   cursor-pointer  rounded-lg font-semibold shadow-md p-3 ' ><Link to="/dashboard">Dashboard</Link></li>
          {isSession() &&  <li className='w-full bg-red-400  flex justify-center items-center gap-2   cursor-pointer  rounded-lg  text-white font-semibold    shadow-md p-3 ' onClick={logOut}  >Sair</li> }
        </ul>
      </nav>
  </header>
  <Toaster richColors />
  <Outlet/>
  
  </>
)
}

export default App
