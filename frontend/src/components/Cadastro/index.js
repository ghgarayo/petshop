import React, { useState } from 'react';
import api from '../../services/api';

export default function Cadastro() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [cartoescredito, setCartoesCredito] = useState('');
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
            senha: senha
        }

        api.post('/customer', bodyParam)
            .then((response) => {
                console.log(response.data)
                alert(" O usuario " + response.data.nomeCompleto + " foi criado com sucesso!")
            })
            .catch((err) => {
                console.error(err)
                alert(" Ocorreu um erro! Veja no console ..")
            })
            .finally(() => {
                setNomeCompleto("")
                setTelefone("")
                setEndereco("")
                setCpf("")
                setCartoesCredito("")
                setEmail("")
                setSenha("")
            })
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="form-custom">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Nome:
                                <input type="text" className="form-control" value={nomeCompleto} onChange={(e) => { setNomeCompleto(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Telefone:
                                <input type="number" className="form-control" value={telefone} onChange={(e) => { setTelefone(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                endereço:
                                <input type="text" className="form-control" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                cpf:
                                <input type="text" className="form-control" value={cpf} onChange={(e) => { setCpf(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                cartão de credito:
                                <input type="text" className="form-control" value={cartoescredito} onChange={(e) => { setCartoesCredito(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Email:
                                <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Senha:
                                <input type="password" className="form-control" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
