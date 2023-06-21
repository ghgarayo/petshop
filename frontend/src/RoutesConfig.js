import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Cliente from './pages/Cliente';
import Pedido from './pages/Pedido';
import PaginaInicial from './pages/inicial';
export default function RoutesConfig() {
    return (
        <Routes>
            <Route path='/' element={<PaginaInicial />} />
            <Route path='/pedido' element={<Pedido />} />
            <Route path='cliente' element={<Cliente />} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<h1> 404 - Página Não Encontrada!</h1>} />
        </Routes>
    );
}