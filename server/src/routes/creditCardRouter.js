const express = require('express')
const router = express.Router()
const creditCardController = require('../controllers/CreditCardController')

// Rota para criar um novo cartão de crédito
router.post('/', creditCardController.create)

// Rota para listar todos os cartões de crédito de um cliente
router.get('/:customerId/creditCards', creditCardController.getAll)

// Rota para obter um cartão de crédito pelo ID
router.get('/:id', creditCardController.getById)

// Rota para atualizar um cartão de crédito pelo ID
router.put('/:id', creditCardController.update)

// Rota para excluir um cartão de crédito pelo ID
router.delete('/:id', creditCardController.delete)

module.exports = router
