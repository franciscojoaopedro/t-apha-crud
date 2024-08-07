import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


interface formDataProps{
    taxNumber:string
    password:string
}

export default function FormLogin(){

    const [formData,setFormData]=useState<formDataProps>({
        taxNumber:"12345678900",
        password:"123456",
    })
    const nav=useNavigate()

    const {login}=useAuth()
    const handleSubmit= async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!formData.password || !formData.taxNumber){
            return toast.error("Por favor, preencha os campos vazios")
            
        }
        if(formData.password.length<6){
            return toast.error("A senha deve ter pelo menos 6 caracteres")
        }
        const data={
            taxNumber:formData.taxNumber,
            password:formData.password
        }
        await login(data)
        .finally(()=>{
            setFormData({
                taxNumber:"",
                password:"",
            })            
        })
        nav("/")
    }





    return(
        <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faça login com sua conta 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border p-4 rounded-lg shadow-md">
          <form  onSubmit={handleSubmit}  className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Telefone
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="tel"
                  required
                  autoComplete="email"
                  value={formData.taxNumber}
                  onChange={(e)=>setFormData({...formData,taxNumber:e.target.value})}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  autoComplete="current-password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
           Não tens uma conta?{' '}
            <Link to={"/auth/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Registra-se
            </Link>
          </p>
        </div>
        
        
        
        </>
    )
}