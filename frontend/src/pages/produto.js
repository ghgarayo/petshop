import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function Produto() {
  const { id } = useParams(); // Obtém o ID do produto da URL
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await api.get(`/product/${id}`);
        setProduto(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduto();
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div>
      {/* Conteúdo do componente Produto */}
      <h2>Detalhes do Produto</h2>
      <p>ID do Produto: {id}</p>
      <p>Nome do Produto: {produto.name}</p>
      <p>Descrição do Produto: {produto.description}</p>
      <p>foto do produto;{produto.image}</p>
      {/* Mostrar outras informações do produto */}
    </div>
  );
}