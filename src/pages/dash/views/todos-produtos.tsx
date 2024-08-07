import { useEffect, useState } from "react"
import { PRODUTO } from "../../../interfaces/interfaces"
import { storeProduto } from "../../../contexts/storeProdutos"
import { Rss, Trash } from "lucide-react"
import useProduto from "../../../hooks/useProduto"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../../../components/spinner-loading"
import useAtualizarProduto from "../../../hooks/useProdutoAtualizar"





export default function Produtos(){
    const [products,setProducts]=useState<PRODUTO[]> ([])
    const{deletarProduto}=useProduto()
    const {setModalFormAtualizarProduto,setProdutoSelecionado,produtoSelecionado}=useAtualizarProduto()
    const {actions:{buscarProduto},state:{produtos}}=storeProduto()
    const {data,isLoading }= useQuery({ queryKey: ['todos-produtos'], queryFn: buscarProduto })
    useEffect(()=>{
        setProducts([...produtos])
    },[data])


    const handleDeleteProduto=(id:number)=>{
      deletarProduto(id)
    }

    const handleSelecionarProduto=(produto:PRODUTO)=>{
        if(!produto) return;
        setProdutoSelecionado(produto)
        setModalFormAtualizarProduto(true)

        console.log(produtoSelecionado)
        toast.info(`Produto selecionado  ${produto.name} `   ,{icon:<Rss />,closeButton:true})

      
    
     
    }

    return(
      <>
        <main className=" w-full h-screen flex flex-col p-4" >
            <div className="w-full flex justify-center  m-[20px] " >
                <h2 className="font-semibold text-2xl " >Produtos</h2>
            </div>
        {
           isLoading?<div className="w-full h-screen flex justify-center items-center" > <Spinner/>  </div>:

          <div className="w-full gap-2   flex  justify-center flex-wrap max-md:justify-center max-h-[80vh] p-3 overflow-y-auto">
        {products.map((product, index) => (
        <div key={index} className="w-[250px] h-[180px] max-md:w-full relative p-3 bg-white rounded-lg shadow-md">
          <h2>Produto: {product.name}</h2>
          <p>Descrição: {product.description}</p>
          <p>Preço: R$ {product.price}</p>
          <div className="absolute gap-3 bottom-0 mb-3 w-full flex justify-center items-center">
            <button
              className="bg-blue-400 px-[32px] py-2 text-white font-semibold rounded"
              onClick={() =>handleSelecionarProduto(product) }
            >
              Atualizar
            </button>
            <button  onClick={()=>handleDeleteProduto(Number(product.id))} 
            className="bg-red-400 cursor-pointer text-white rounded-lg w-[48px] h-[38px]  flex justify-center items-center "  >
            <Trash />
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