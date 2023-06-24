const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/CustomerController')
const multer = require('multer')
const upload = multer()

/* 

  As rotas deste documento devem ser acessadas a partir da rota /customer

*/

// Rota para criar um novo cliente
router.post('/', upload.single('avatar'), CustomerController.create)

// Rota para listar todos os clientes
router.get('/', CustomerController.list)

// Rota para obter um cliente pelo código
router.get('/:id', CustomerController.getById)

// Rota para atualizar um cliente pelo código
router.put('/:id', CustomerController.update)

// Rota para inativar um cliente pelo código [USAR PATCH PARA EXCLUSÃO LÓGICA]
router.patch('/:id', CustomerController.inactivate)

// Rota para excluir um cliente pelo código [APENAS PARA DEMONSTRAÇÃO, NÃO UTILIZAR EM PRODUÇÃO]
router.delete('/:id', CustomerController.delete)

module.exports = router
