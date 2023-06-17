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
    },
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
