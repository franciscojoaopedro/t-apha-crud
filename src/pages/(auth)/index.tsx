import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";



export default function AuthLayout(){
    const nav=useNavigate()


    useEffect(()=>{
        const token=Cookies.get("token") as string
        if(token)  nav("/");
        toast.info("Faça fez o login!")
    },[])


    return(

        <div className='w-full h-[100vh]'>
            <Outlet />
            <Toaster richColors  />
        </div>
    )
}