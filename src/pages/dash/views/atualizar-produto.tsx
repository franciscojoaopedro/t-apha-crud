import { PRODUTO } from "../../../interfaces/interfaces";
import FormAtualizarProduto from "../_components/formAtualizarProduto";



interface selectProduto{
    produto:PRODUTO
    onClose:()=>void

}



export default function AtualizarProduto({ onClose, produto }: selectProduto) {

    return (
        <main className="bg-black bg-opacity-50 absolute top-0 left-0 z-10 w-full h-screen  justify-center items-center">
            <FormAtualizarProduto onClose={onClose} produto={produto} />
        </main>
    );
}
