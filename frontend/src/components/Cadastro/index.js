import React, { useState } from 'react';
import api from '../../services/api';

export default function Cadastro() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [cartoescredito, setCartoesCredito] = useState('');
  const [cvc, setCvc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const bodyParam = {
      nomeCompleto: nomeCompleto,
      telefone: telefone,
      email: email,
      endereco: endereco,
      cpf: cpf,
      cartoescredito: cartoescredito,
      cvc: cvc,
      senha: senha
    };

    api
      .post('/customer', bodyParam)
      .then((response) => {
        console.log(response.data);
        alert('O usuário ' + response.data.nomeCompleto + ' foi criado com sucesso!');
      })
      .catch((err) => {
        console.error(err);
        alert('Ocorreu um erro! Veja no console.');
      })
      .finally(() => {
        setNomeCompleto('');
        setTelefone('');
        setEndereco('');
        setCpf('');
        setCartoesCredito('');
        setCvc('');
        setEmail('');
        setSenha('');
      });
  };

  const isCartaoValid = cartoescredito.length <= 20;
  const isCvcValid = cvc.length === 3;

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Cadastro:</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nome:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nomeCompleto}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Telefone:</label>
                      <input
                        type="number"
                        className="form-control"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                      <br/>
                    </div>
                    <div className="form-group">
                      <label>Endereço:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>CPF:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Número do Cartão de Crédito:</label>
                      <input
                        type="text"
                        className={`form-control ${isCartaoValid ? '' : 'is-invalid'}`}
                        value={cartoescredito}
                        onChange={(e) => setCartoesCredito(e.target.value)}
                        maxLength={20}
                      />
                      {!isCartaoValid && <div className="invalid-feedback">Número do cartão de crédito deve ter no máximo 20 dígitos.</div>}
                    </div>
                    <div className="form-group">
                      <label>CVC:</label>
                      <input
                        type="text"
                        className={`form-control ${isCvcValid ? '' : 'is-invalid'}`}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        maxLength={3}
                      />
                      {!isCvcValid && <div className="invalid-feedback">CVC deve ter 3 dígitos.</div>}
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Senha:</label>
                      <input
                        type="password"
                        className="form-control"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
