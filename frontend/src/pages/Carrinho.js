import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PedidoFormulario from "../components/PedidoFormulario";

import axios from "axios";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [quantidades, setQuantidades] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
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

  useEffect(() => {
    const produtosNoCarrinho = localStorage.getItem("produtosNoCarrinho");
    if (produtosNoCarrinho) {
      const produtos = JSON.parse(produtosNoCarrinho);
      setProdutos(produtos);
      setQuantidades(Array(produtos.length).fill(1));
    }
  }, []);


  const calcularValorParcial = (quantidade, produto) => {
    return (quantidade * produto.price).toFixed(2);
  };

  const handleQuantidadeChange = (event, index) => {
    const novasQuantidades = [...quantidades];
    novasQuantidades[index] = event.target.value;
    setQuantidades(novasQuantidades);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!token) {
      alert("Você precisa estar logado para finalizar o pedido");
      navigate("/login");
    } else {
      let pedidoCompleto = produtos.map((produto, index) => ({
        id: produto._id,
        quantity: quantidades[index],
      }));

      axios
        .post("http://localhost:3001/order", {
          order: pedidoCompleto,
          total: valorTotal,
        })
        .then((response) => {
          // A solicitação foi concluída com sucesso
          alert("Pedido finalizado com sucesso!");
          localStorage.removeItem("produtosNoCarrinho");
          navigate("/");
        })
        .catch((error) => {
          // Ocorreu um erro ao enviar a solicitação
          console.error("Erro ao finalizar o pedido:", error);
          // Trate o erro de acordo com sua necessidade
        });
    }
  }

  return (
    <div className="container text-center">
      <PedidoFormulario
        produtos={produtos}
        quantidades={quantidades}
        calcularValorParcial={calcularValorParcial}
        handleQuantidadeChange={handleQuantidadeChange}
        valorTotal={valorTotal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
