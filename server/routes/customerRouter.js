const express = require('express')
const router = express.Router()
const customerController = require('../controllers/CustomerController')

// Rota para criar um novo cliente
router.post('/', customerController.create)

// Rota para listar todos os clientes
router.get('/', customerController.list)

// Rota para obter um cliente pelo código
router.get('/:codigo', customerController.getById)

// Rota para atualizar um cliente pelo código
router.put('/:codigo', customerController.update)

// Rota para excluir um cliente pelo código
router.delete('/:codigo', customerController.delete)

// Rota para criar um novo cartão de crédito para um cliente
router.post('/:customerId/creditCards', customerController.createCreditCard)

module.exports = router
