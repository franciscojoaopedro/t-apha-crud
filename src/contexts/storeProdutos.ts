import { create } from "zustand";
import api from "../services/api";
import Cookies from "js-cookie";
import { toast } from "sonner";


interface Produto{
    name:string
    price:number
    description:string
    stock:number
}

interface produtoProps extends Produto{
    id?:number
}


type typeStoreProduto={
    state:{
        produtos:Produto[]
        produto:produtoProps |null

    }
    actions:{
        buscarProduto: () =>void,
        buscarProdutoId:(id:number)=>void
    }
}



export const storeProduto=create<typeStoreProduto>((set)=>({
    state:{
        produtos:[],
        produto:null
    },
    actions:{
        buscarProduto:async  ()  =>{
           const data= await api.get("/products/get-all-products",{
                headers:{
                    Authorization:"Bearer "+Cookies.get("token")
                }
            })
            .then((response)=>{
                const produtos: produtoProps[] =response.data.data.products
                set((state)=>({
                    state:{
                        ...state.state,
                        produtos:produtos,    
                    }
                    
                }))

                return produtos
            })
            return  data
        },
        buscarProdutoId:async(id:number) =>{
            try {
                const response = await api.get(`products/get-one-product/${id}`, {
                  headers: {
                    Authorization: "Bearer " + Cookies.get("token"),
                  },
                });
                const produto = response.data;
                set((state) => ({
                  state: {
                    ...state.state,
                    produto: produto,
                  },
                }));
              } catch (error) {
                toast.error(`Erro ao buscar produto com id ${id}`);
              }
        }

    }
}))