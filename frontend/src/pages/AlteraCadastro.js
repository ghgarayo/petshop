import React from 'react';
import Title from './../components/Title/index';
import AlteracaoCadastro from '../components/Alteracadastro';

export default function Cliente() {
    return (
        <div>
            <Title
                title={"Criar conta"}
                text={"Alteração de cadastro de cliente"} />
            <AlteracaoCadastro />
        </div>
    )
}