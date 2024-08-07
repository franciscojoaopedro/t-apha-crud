import { create } from "zustand";
import {PROPS_PRODUTO} from "../interfaces/produto"





interface typeStoreModalFormAtualizarProduto{
    state:{
        modalFormAtualizarProduto:boolean,
        produtoSelecionado:PROPS_PRODUTO | null,
    }
    actions:{
        abrirModalAtualizar:(produto:PROPS_PRODUTO)=>void
        fecharModalAtualizar:()=>void
    }
}

export const stroreModalFormAtualizarProduto=create<typeStoreModalFormAtualizarProduto>((set)=>({
    state:{
        modalFormAtualizarProduto:false,
        produtoSelecionado:null,
    },
    actions:{
        abrirModalAtualizar:(produto:PROPS_PRODUTO)=>set((state)=>({
            state:{
               ...state.state,
                modalFormAtualizarProduto:true,
                produtoSelecionado:produto
            }
        })),
        fecharModalAtualizar:()=>set((state)=>({
            state:{
               ...state.state,
                modalFormAtualizarProduto:false,
                produtoSelecionado:null
            }
        }))
    }
}))