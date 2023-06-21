const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

const { Schema } = mongoose

const customerSchema = new mongoose.Schema({
	fotoPerfil: {
		type: String,
	},
	nomeCompleto: {
		type: String,
		required: true,
	},
	endereco: {
		type: String,
		required: true,
	},
	telefone: {
		type: String,
		required: true,
	},
	cpf: {
		type: String,
		required: true,
		unique: true,
	},
	cartoesCredito: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CartaoCredito',
		},
	],
	email: {
		type: String,
		required: true,
		unique: true,
	},
	senha: {
		type: String,
		required: true,
		select: false,
	},
	ativo: {
		type: Boolean,
		default: true,
	},
})

customerSchema.pre('save', async function (next) {
	const hash = await bcryptjs.hash(this.senha, 10)
	this.senha = hash
	next()
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer

/*
        O esquema define a estrutura dos dados para um cliente. Cada campo do cliente tem um tipo associado e, opcionalmente, configurações adicionais.

        Aqui estão as descrições dos campos do cliente no esquema:

        fotoPerfil: Uma string que representa o caminho ou URL para a foto de perfil do cliente. É opcional.
        nomeCompleto: Uma string que representa o nome completo do cliente. É obrigatório.
        endereco: Uma string que representa o endereço do cliente. É obrigatório.
        telefone: Uma string que representa o número de telefone do cliente. É obrigatório.
        cpf: Uma string que representa o número do CPF do cliente. É obrigatório e único.
        cartoesCredito: Um array de IDs de objetos de cartão de crédito associados ao cliente. Cada ID é uma referência a um documento do modelo CartaoCredito. Permite criar uma associação entre os clientes e seus cartões de crédito.
        email: Uma string que representa o endereço de e-mail do cliente. É obrigatório e único.
        senha: Uma string que representa a senha do cliente. É obrigatório.
        
        O esquema é usado para criar o modelo Customer por meio da função mongoose.model(). Em seguida, o modelo é exportado para ser utilizado em outras partes do aplicativo.
 */
