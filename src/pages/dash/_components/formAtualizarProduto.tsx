import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import useProduto from "../../../hooks/useProduto";
import { PRODUTO } from "../../../interfaces/interfaces";



interface selectProduto{
    produto:PRODUTO 
    onClose:()=>void

}


export default function FormAtualizarProduto({produto,onClose}:selectProduto){

  
    const [formData,setFormData]=useState<PRODUTO>({
        name:produto?.name,
        price:produto?.price,
        description:produto?.description,
        stock:produto?.stock,
    })

    const {atualizarProduto}=useProduto()

  
    const handleSubmit= async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!formData.name || !formData.description  || !formData.price || !formData.stock  ){
            return toast.error("Por favor, preencha os campos vazios")
            
        }
        if(formData.price===0){
            return toast.error("O produto tem que ter um preço!")
        }
        if(formData.stock<=0){
            return toast.error("O produto tem que ter um estoque maior que zero!")
        }


        const data={

            name:formData.name,
            price:formData.price,
            description:formData.description,
            stock:formData.stock,
        }
        await atualizarProduto(Number(produto.id),data)
        
    }

    useEffect(()=>{
     
    },[produto])




    return(
        <>

        <div className=" bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm border p-4 rounded-lg shadow-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Atualizar o  produto
          </h2>
        </div>
          <form  onSubmit={handleSubmit}  className="space-y-6">
          <div>
              <label htmlFor="nomeProduto" className="block text-sm font-medium leading-6 text-gray-900">
              Nome do produto
              </label>
              <div className="mt-2">
                <input
                  id="nomeProduto"
                  name="nomeProduto"
                  type="text"
                  required
                  autoComplete="on"
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium leading-6 text-gray-900">
              Descrição do produto
              </label>
              <div className="mt-2">
                <input
                  id="descricao"
                  name="descricao"
                  type="text"
                  required
                  autoComplete="on"
                  value={formData.description}
                  onChange={(e)=>setFormData({...formData,description:e.target.value})}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="precoProduto" className="block text-sm font-medium leading-6 text-gray-900">
              Preço do produto
              </label>
              <div className="mt-2">
                <input
                  id="precoProduto"
                  name="precoProduto"
                  type="number"
                  required
                  autoComplete="shipping cc-number"
                  value={formData.price}
                  onChange={(e)=>setFormData({...formData,price:Number(e.target.value)})}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="stockProduto" className="block text-sm font-medium leading-6 text-gray-900">
                Stock do produto
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="stockProduto"
                  name="stockProduto"
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e)=>setFormData({...formData,stock:Number(e.target.value)})}
                  autoComplete="off"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                />
              </div>
            </div>
            <div  className="flex gap-2 " >
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Atualizar
              </button>
              <button 
                onClick={onClose}
                type="button"
                className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Fechar
              </button>
            </div>
          </form>
        </div>
        
        
        
        </>
    )
}