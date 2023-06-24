const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')

// Rota para criar um novo pedido
router.post('/', orderController.create)

// Rota para listar todos os pedidos
router.get('/', orderController.list)

// Rota para obter um pedido pelo código
router.get('/:id', orderController.getById)

// Rota para atualizar um pedido pelo código
router.put('/:id', orderController.updateStatus)

module.exports = router
