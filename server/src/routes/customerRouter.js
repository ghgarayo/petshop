const express = require('express')
const router = express.Router()
const customerController = require('../controllers/CustomerController')


/* 

  As rotas deste documento devem ser acessadas a partir da rota /customer

*/

// Rota para criar um novo cliente
router.post('/', customerController.create)

// Rota para listar todos os clientes
router.get('/', customerController.list)

// Rota para obter um cliente pelo código
router.get('/:id', customerController.getById)

// Rota para atualizar um cliente pelo código
router.put('/:id', customerController.update)

// Rota para inativar um cliente pelo código
router.patch('/:id', customerController.inactivate)

// Rota para excluir um cliente pelo código [APENAS PARA DEMONSTRAÇÃO, NÃO UTILIZAR EM PRODUÇÃO]
router.delete('/:id', customerController.delete)

module.exports = router
