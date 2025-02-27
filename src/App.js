import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { Pets } from "./pages/Pets/Pets";
import { EditaPet } from "./pages/EditarPet/EditarPet";
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";
import { Servicos } from "./pages/Servicos/Servicos";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { EditaServico } from "./pages/EditaServico/EditaServico";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { EditaProduto } from "./pages/EditarProduto/EditarProduto";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { Produtos } from "./pages/Produtos/Produtos";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { EditaAgendamento } from "./pages/EditaAgendamento/EditaAgendamento";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/Produto/editar/:id" element={<EditaProduto />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets/editar/:id" element={<EditaPet/>} />
          <Route path="/pedidos" element={<Pedidos/>} />
          <Route path="/pedidos/novo" element={<NovoPedido/>} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/agendamentos/editar/:id" element={<EditaAgendamento />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/servicos/editar/:id" element={< EditaServico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
