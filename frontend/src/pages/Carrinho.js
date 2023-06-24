import React, { useEffect, useState } from 'react';

const Carrinho = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const produtosNoCarrinho = localStorage.getItem('produtosNoCarrinho');
    if (produtosNoCarrinho) {
      const produtos = JSON.parse(produtosNoCarrinho);
      setProdutos(produtos);
    }
  }, []);

  const calcularValorTotal = () => {
    return produtos.reduce((total, produto) => total + produto.price, 0);
  };

  const finalizarPedido = () => {
    // Lógica para finalizar o pedido
  };

  return (
    <div className="container text-center">
      <div className="row">
        {produtos.map((produto, index) => (
          <div className="col" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{produto.name} </h5>
                <p>Descrição: {produto.description}</p>
                <p>Preço: R$ {produto.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <br />
          <p className="lead">Valor Total do Pedido: R$ {calcularValorTotal().toFixed(2)}</p>
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={finalizarPedido}>
        Finalizar Pedido
      </button>
    </div>
  );
};

export default Carrinho;
