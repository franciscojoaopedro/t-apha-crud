import { toast } from "sonner";
import { PRODUTO } from "../interfaces/interfaces";
import api from "../services/api";
import Cookies from "js-cookie";



export default function useProduto(){
   

    async function criarProduto(data:PRODUTO){

        await api.post("/products/create-product",data,{
            headers:{
                Authorization:"Bearer "+Cookies.get("token")
            }
        })
        .then((response)=>{
            console.log(response.data.message)
            toast.success(response.data.message)
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Ocorreu um erro ao tentar cadastrar o produto")
        })

    }
    async function atualizarProduto(idProduto:number,data:PRODUTO) {
        await api.patch(`/products/update-product/${idProduto}`,data,{
            headers:{
                Authorization:"Bearer "+Cookies.get("token")
            }
 
        })
        .then((response)=>{
            console.log(response.data.message)
            toast.success(response.data.message)
           
            
        })
       .catch((error)=>{
        console.log(error)
            toast.error("Ocorreu um erro ao tentar atualizar o produto")
 
       })
    }

       async function deletarProduto(idProduto:number,) {
        try {
            await api.delete(`/products/delete-product/${idProduto}`,{
                headers:{
                    Authorization:"Bearer "+Cookies.get("token")
            }})
            .then(()=>{
                toast.success("Produto deletado com sucesso!")
            })



        } catch (error) {
            console.log(error)
            toast.error("Ocorreu um erro ao tentar deletar o produto")
        }

           
 
       }
       


        
       


    return {criarProduto,
        atualizarProduto,
        deletarProduto,
       
    }


}