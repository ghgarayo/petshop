import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function PaginaInicial() {
  const [servicos, setServicos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [filtro, setFiltro] = useState('');
  const [servicosFiltrados, setServicosFiltrados] = useState([]);
  const [ordem, setOrdem] = useState('nome');

  useEffect(() => {
    async function fetchServicos() {
      try {
        const response = await api.get('/product');
        setServicos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCategorias() {
      try {
        const response = await api.get('/category');
        const categoriasMap = {};

        response.data.forEach((categoria) => {
          categoriasMap[categoria._id] = categoria.name;
        });

        setCategorias(categoriasMap);
      } catch (error) {
        console.error(error);
      }
    }

    fetchServicos();
    fetchCategorias();
  }, []);

  useEffect(() => {
    let servicosFiltrados = servicos.filter((servico) =>
      servico.name.toLowerCase().includes(filtro.toLowerCase())
    );

    if (ordem === 'precoMaiorMenor') {
      servicosFiltrados = servicosFiltrados.sort((a, b) => b.price - a.price);
    } else if (ordem === 'precoMenorMaior') {
      servicosFiltrados = servicosFiltrados.sort((a, b) => a.price - b.price);
    }

    setServicosFiltrados(servicosFiltrados);
  }, [filtro, ordem, servicos]);

  function groupByCategory(produtos) {
    const grouped = {};

    produtos.forEach((produto) => {
      const { category } = produto;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(produto);
    });

    return grouped;
  }

  const groupedServicos = groupByCategory(servicosFiltrados);

  return (
    <div>
      <div className="container text-center">
        <h1>Bem-vindo ao Petshop</h1>
        <br />
        <br />
        <h2>Serviços</h2>
        <div className="d-flex justify-content-center align-items-center">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="input-group-append">
              <select
                className="form-control"
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
              >
                <option value="nome">Ordenar por Nome</option>
                <option value="precoMaiorMenor">
                  Ordenar por Preço (Maior para Menor)
                </option>
                <option value="precoMenorMaior">
                  Ordenar por Preço (Menor para Maior)
                </option>
              </select>
            </div>
          </div>
        </div>
        <br />
        {Object.entries(groupedServicos).map(([categoryId, produtos]) => (
          <div key={categoryId}>
            <h3>{categorias[categoryId]}:</h3>
            <div className="row">
              {produtos.map((produto) => (
                <div className="col-md-4" key={produto._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{produto.name}</h5>
                      <p className="card-text">{produto.description}</p>
                      <Link to={`/product/${produto._id}`} className="btn btn-primary">Detalhes</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
