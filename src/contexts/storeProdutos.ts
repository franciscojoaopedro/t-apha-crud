import { create } from "zustand";
import api from "../services/api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { PRODUTO } from "../interfaces/interfaces";




type typeStoreProduto={
    state:{
        produtos:PRODUTO[]
        produto:PRODUTO|null,
        produtoSelecionado:PRODUTO |null

    }
    actions:{
        buscarProduto: () =>void,
        buscarProdutoId:(id:number)=>void,
        selecionarProduto:(produto:PRODUTO)=>void,
    }
}



export const storeProduto=create<typeStoreProduto>((set)=>({
    state:{
        produtos:[],
        produto:null,
        produtoSelecionado:null
    },
    actions:{
        buscarProduto:async  ()  =>{
           const data= await api.get("/products/get-all-products",{
                headers:{
                    Authorization:"Bearer "+Cookies.get("token")
                }
            })
            .then((response)=>{
                const produtos: PRODUTO[] =response.data.data.products
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
        },
        selecionarProduto:(produto:PRODUTO)=>
            set((state)=>({
            state:{
               ...state.state,
                produtoSelecionado:produto
            }
        }))


    }
}))