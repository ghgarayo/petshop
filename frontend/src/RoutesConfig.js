import { Routes, Route } from 'react-router-dom';
import Produto from './pages/produto';
import Login from './pages/Login';
import Cliente from './pages/Cliente';
import PaginaInicial from './pages/inicial';
import Carrinho from './pages/Carrinho';
import AlteracaoCadastro from './components/Alteracadastro';
export default function RoutesConfig() {
  return (

    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/product/:id" element={<Produto />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/alteracao" element={<AlteracaoCadastro />} />
      <Route path="*" element={<h1>404 - Página Não Encontrada!</h1>} />
    </Routes>

  );
}