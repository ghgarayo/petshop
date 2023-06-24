import React, { useState } from 'react';
import api from '../../services/api';

export default function Cadastro() {
  const [avatar, setAvatar] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.indexOf('@') === -1) {
      alert('O campo de email deve conter o caractere "@"');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('avatar', avatar ? avatar : '');
      formData.append('nomeCompleto', nomeCompleto);
      formData.append('telefone', telefone);
      formData.append('endereco', endereco);
      formData.append('cpf', cpf);
      formData.append('email', email);
      formData.append('senha', senha);
      formData.append('cardHolderName', cardHolderName);
      formData.append('cardNumber', cardNumber);
      formData.append('cvc', cvc);
      formData.append('expirationDate', expirationDate);

      await api.post('/customer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(`O usuário ${nomeCompleto} foi criado com sucesso!`);
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro! Veja no console.');
    }
  };

  const resetForm = () => {
    setAvatar(null);
    setNomeCompleto('');
    setTelefone('');
    setEndereco('');
    setCpf('');
    setEmail('');
    setSenha('');
    setCardHolderName('');
    setCardNumber('');
    setCvc('');
    setExpirationDate('');
  };

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
                      <label>Foto de Perfil:</label>
                      <input
                        type="file"
                        className="form-control-file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                      />
                    </div>
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
                        maxLength={11} // Limite de 11 caracteres (incluindo máscara)
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nome do Titular:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Número do Cartão de Crédito:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={20} // Limite de 20 caracteres (incluindo máscara)
                      />
                    </div>
                    <div className="form-group">
                      <label>CVC:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        maxLength={3} // Limite de 11 caracteres (incluindo máscara)
                      />
                    </div>
                    <div className="form-group">
                      <label>Data de Validade:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        maxLength={5}
                      />
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
