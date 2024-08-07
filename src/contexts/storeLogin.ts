import { create } from "zustand";
import Cookies from "js-cookie"
import api from "../services/api";



type auth={
    login: (data:{taxNumber:string,password:string}) => void,
    register: (data:{taxNumber:string,password:string}) => void
}


interface user{
    name:string
    taxNumber:string
    mail:string
    phone:string
    password:string
}



type storeTypeLogin={
    user:user|null
    auth:auth
}



export const storeLogin=create<storeTypeLogin>((set)=>({
    user:null,
    auth:{
        login:async(data)=> {
           return await api.post("/auth/login",data)
        },
        register(data) {
            console.log(data)
        },
    }
    
}))