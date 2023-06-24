/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrinho = () => {
  const [produtos, setProdutos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [quantidades, setQuantidades] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const produtosNoCarrinho = localStorage.getItem("produtosNoCarrinho");
    if (produtosNoCarrinho) {
      const produtos = JSON.parse(produtosNoCarrinho);
      setProdutos(produtos);
      setQuantidades(Array(produtos.length).fill(1));
    }
  }, []);

  useEffect(() => {
    const calcularValorTotal = () => {
      let total = 0;
      for (let i = 0; i < produtos.length; i++) {
        total += quantidades[i] * produtos[i].price;
      }
      return total.toFixed(2);
    };

    const novoValorTotal = calcularValorTotal();
    setValorTotal(novoValorTotal);
  }, [produtos, quantidades]);

  const calcularValorParcial = (quantidade, produto) => {
    return (quantidade * produto.price).toFixed(2);
  };

  const handleQuantidadeChange = (event, index) => {
    const novasQuantidades = [...quantidades];
    novasQuantidades[index] = event.target.value;
    setQuantidades(novasQuantidades);
  };

  const finalizarPedido = () => {
    if (!token) {
      alert("Você precisa estar logado para finalizar o pedido");
      useNavigate("/login");
    } else {
      // Fazer a solicitação POST para o endpoint
      axios
        .post("http://localhost:3001/order", {
          // dados do pedido que você deseja enviar
        })
        .then((response) => {
          // A solicitação foi concluída com sucesso
          alert("Pedido finalizado com sucesso!");
          localStorage.removeItem("produtosNoCarrinho");
          useNavigate("/");
        })
        .catch((error) => {
          // Ocorreu um erro ao enviar a solicitação
          console.error("Erro ao finalizar o pedido:", error);
          // Trate o erro de acordo com sua necessidade
        });
    }
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
                <p>Preço: R$ {produto.price}</p>
                <p>
                  Quantidade:
                  <input
                    className="product-quantity"
                    type="number"
                    defaultValue={1}
                    onChange={(event) => handleQuantidadeChange(event, index)}
                  />
                </p>
                <p className="lead">
                  Valor: R$ {calcularValorParcial(quantidades[index], produto)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <h4>Valor Total: R$ {valorTotal}</h4>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={finalizarPedido}
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default Carrinho;
