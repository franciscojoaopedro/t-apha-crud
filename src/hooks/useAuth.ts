import { toast } from "sonner"
import {DATALOGIN,USER} from "../interfaces/interfaces"
import api from "../services/api"
import Cookies from "js-cookie" 
import { AxiosError } from "axios"

export default function useAuth (){
    async function login (data:DATALOGIN){
       await api.post("/auth/login",data)
       .then((response)=>{
        console.log(response.data)
            Cookies.set("token",response.data.data.token)
            toast.success(response.data.message)
      })
      .catch((error)=>{
        console.log(error)
      })
      
    }

    
    async function register (data:USER){
       await api.post("/auth/register",data)
       .then((response)=>{
            console.log(response.data.message)
      })
      .catch((error:AxiosError)=>{

        const data=error
        if(data.response && data.response.status === 400){
          const message=data.response.data  as {message:string}
            toast.error(message.message)
        }else{
            toast.error("Erro ao conectar com o servidor")
        }
      })
      
      
     }

     function logOut(){
       Cookies.remove("token")
       toast.success("Sessão encerrada")
       window.location.href="/"
     }

     function isSession(){
       const token=Cookies.get("token") as string
       if(!token) return false
       return true
     }

     return {login,register,logOut,isSession}
}





