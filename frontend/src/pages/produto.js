import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/produto.css'; // Importe o arquivo CSS para estilos personalizados

export default function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await api.get(`/product/${id}`);
        setProduto(response.data);
        setIsLoading(false);
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

  // Converte o array de bytes em uma representação base64
  const bytes = new Uint8Array(produto.image.data);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const imageBase64 = btoa(binary);
  const imageUrl = `data:image/jpg;base64,${imageBase64}`;

  return (
    <div className="container">
      <h2 className="mt-4">Detalhes do Produto</h2>
      <div className="card mb-4">
        <div className="card-body">
          <img src={imageUrl} className="img" alt={produto.name} />
          <div className="card-text">
            <h5 className="card-title">{produto.name}</h5>
            <p>{produto.description}</p>
            <p>Preço: R$ {produto.price.toFixed(2)}</p>
            {/* Exibir outros detalhes do produto conforme necessário */}
          </div>
        </div>
      </div>
    </div>
  );
}
