import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CirclePlus, House } from "lucide-react";
import CadastrarProduto from "./views/criar-produto";
import Produtos from "./views/todos-produtos";
import AtualizarProduto from "./views/atualizar-produto";
import { stroreModalFormAtualizarProduto } from "../../contexts/storeModalFormAtualizar";

export default function Dashboard() {  
  const [views, setViews] = useState(0);
  const nav = useNavigate();
  const {actions:{fecharModalAtualizar},state:{produtoSelecionado,modalFormAtualizarProduto}}=stroreModalFormAtualizarProduto()

  useEffect(() => {
    const token = Cookies.get("token") as string;
    
    if (!token) {
      toast.info("Primeiro faça o login");
      nav("/auth/login");

    }
    console.log(produtoSelecionado)

  }, []);


  return (
    <main className="w-full h-screen bg-white flex justify-center items-center">
      <div className="w-full flex">
        <aside className="w-1/6 max-md:w-[25%] bg-white h-screen items-center flex flex-col px-3">
          <div className="bg-slate-900 rounded-lg w-full mb-2 flex justify-center p-3">
            <h2 className="font-semibold text-center text-white">Menu</h2>
          </div>

          <ul className="w-full flex flex-col gap-5">
            <li
              onClick={() => setViews(0)}
              className="w-full bg-gray-900 hover:bg-white text-white hover:text-black flex justify-center md:justify-start items-center gap-2 cursor-pointer rounded-lg shadow-md p-3"
            >
              <House />
              <p className="font-semibold hidden md:block">Inicio</p>
            </li>
            <li
              onClick={() => setViews(1)}
              className="w-full bg-gray-900 hover:bg-white text-white hover:text-black flex justify-center md:justify-start items-center gap-2 cursor-pointer rounded-lg shadow-md p-3"
            >
              <CirclePlus />
              <p className="font-semibold hidden md:block">Adicionar produto</p>
            </li>
          </ul>
        </aside>
        <section className="bg-slate-200  relative shadow-md items-center justify-center w-full h-screen rounded-l-2xl">
          {views === 0 && <Produtos />}
          {views === 1 && <CadastrarProduto />}
          {modalFormAtualizarProduto && produtoSelecionado   &&(
            <AtualizarProduto
              produto={produtoSelecionado}
              onClose={fecharModalAtualizar}

            />
          )
        }
        </section>
      </div>
    </main>
  );
}
