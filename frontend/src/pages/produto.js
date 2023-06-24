import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Produto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduto(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComentarios = async () => {
      try {
        const response = await api.get(`/comment/findAll/${id}`);
        setComentarios(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduto();
    fetchComentarios();
  }, [id]);

  useEffect(() => {
    const fetchComentarioNome = async (comentario) => {
      try {
        const response = await api.get(`/customer/${comentario.customer}`);
        comentario.customerName = response.data.nomeCompleto;
        setComentarios((prevComentarios) =>
          prevComentarios.map((prevComentario) =>
            prevComentario._id === comentario._id ? comentario : prevComentario
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    comentarios.forEach((comentario) => {
      fetchComentarioNome(comentario);
    });
  }, [comentarios]);

  const adicionarAoCarrinho = () => {
    const produtosNoCarrinho = localStorage.getItem('produtosNoCarrinho');
    const produtos = produtosNoCarrinho ? JSON.parse(produtosNoCarrinho) : [];
    produtos.push(produto);
    localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtos));
    navigate('/carrinho');
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

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
            <button onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
      <h3>Comentários</h3>
      {comentarios.length === 0 ? (
        <div>Nenhum comentário disponível.</div>
      ) : (
        comentarios.map((comentario) => (
          <div key={comentario._id} className="card mb-3">
            <div className="card-body">
              <div>
                <p className="card-nome">Nome: {comentario.customerName}</p>
                <p className="card-text">Data do comentário: {comentario.date}</p>
                <p className="card-text">Comentário: {comentario.details}</p>
                <p className="card-text">Nota: {comentario.rating}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Produto;
