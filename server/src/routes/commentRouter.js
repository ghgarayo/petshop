const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')

// Rota para criar um novo produto
router.post('/', productController.create)

// Rota para listar todos os produtos
router.get('/', productController.list)

// Rota para obter um produto pelo código
router.get('/:code', productController.getById)

// Rota para atualizar um produto pelo código
router.put('/:code', productController.update)

// Rota para excluir um produto pelo código
router.delete('/:code', productController.delete)

module.exports = router

// Path: src\routes\commentRouter.js