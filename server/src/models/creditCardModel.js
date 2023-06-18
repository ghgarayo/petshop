const mongoose = require('mongoose')

const cartaoCreditoSchema = new mongoose.Schema({
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
        unique: true,
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
    ativo: {
        type: Boolean,
        default: true,
    },
})

const CartaoCredito = mongoose.model('CartaoCredito', cartaoCreditoSchema)

module.exports = CartaoCredito
