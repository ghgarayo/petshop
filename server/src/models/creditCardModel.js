const mongoose = require('mongoose')

const cartaoCreditoSchema = new mongoose.Schema({
    code:{
        type: Number,
        required: true,
        unique: true,
    },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer' 
    },
    nome: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
    cvc: {
        type: String,
        required: true,
    },
    dataExpiracao: {
        type: String,
        required: true,
    },
    bandeira: {
        type: String,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true,
    },
})

const CartaoCredito = mongoose.model('CartaoCredito', cartaoCreditoSchema)

module.exports = CartaoCredito
