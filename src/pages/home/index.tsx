import { useEffect, useState } from "react"
import { storeProduto } from "../../contexts/storeProdutos"
import { PRODUTO } from "../../interfaces/interfaces"
import { toast } from "sonner"
import { ShoppingCart } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../../components/spinner-loading"


import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default  function Produtos(){
    
    const [products,setProducts]=useState<PRODUTO[]> ([])
    
    const {actions:{buscarProduto},state:{produtos}}=storeProduto()
    const {data,isLoading }= useQuery({ queryKey: ['todos-produtos'], queryFn: buscarProduto })
    const nav=useNavigate() 
    useEffect(()=>{
        setProducts([...produtos])
    },[data])

const handleAddCart=(produto:PRODUTO)=>{
    toast.success(` ${produto.name} adicionado ao carrinho`)
}

useEffect(() => {
    const token = Cookies.get("token") as string;
    if (!token) {
      toast.info("Primeiro faça o login");
      nav("/auth/login");
    }
  }, []);



    return(
        <>
        <main className="bg-slate-100  w-full h-screen flex flex-col p-4" >
            <div className="w-full flex justify-center  m-[20px] " >
                <h2 className="font-semibold text-2xl " >Produtos</h2>
            </div>
        
        {
            isLoading?<div className="w-full h-screen flex justify-center items-center" > <Spinner/>  </div>:

            <div className="w-full gap-2 flex flex-wrap justify-center max-md:justify-center max-h-[80vh] p-3 overflow-y-auto">
        {products.map((product, index) => (
        <div key={index} className="w-[250px] h-[180px] max-md:w-full relative p-3 bg-white rounded-lg shadow-md">
          <h2>Produto: {product.name}</h2>
          <p>Descrição: {product.description}</p>
          <p>Preço: R$ {product.price}</p>
          <div className="absolute bottom-0 mb-3 w-full flex justify-center items-center">
            <button
              className="bg-green-400 px-[32px] py-2 text-white font-semibold rounded"
              onClick={()=>handleAddCart(product)}
            >
              <ShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </div>
        }

        </main>

      
        
      

        </>
    )
}