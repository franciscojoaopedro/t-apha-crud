import { useState } from "react"
import { PRODUTO } from "../interfaces/interfaces"






export default function useAtualizarProduto(){
    const [modalFormAtualizarProduto,setModalFormAtualizarProduto]=useState<boolean>(false)
    const [produtoSelecionado,setProdutoSelecionado]=useState<PRODUTO>()
   






    return{
        modalFormAtualizarProduto,
        setModalFormAtualizarProduto,
        produtoSelecionado,
        setProdutoSelecionado,
    }

}