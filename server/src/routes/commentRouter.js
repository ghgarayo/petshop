const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

// Rota para criar um novo comentário
router.post('/', commentController.create)

// Rota para listar todos os comentários, de todos os produtos, de todos os clientes
router.get('/', commentController.list)

// Rota para obter um comentario pelo código
router.get('/:id', commentController.getById)

// Rota para obter todos os comentários de um produto
router.get('/findAll/:productId', commentController.getAllByProductId)

// Rota para atualizar um produto pelo código
router.put('/:id', commentController.update)

// Rota para inativar um comentário pelo código [USAR PATCH PARA EXCLUSÃO LÓGICA]
router.patch('/:id', commentController.inactivate)

// Rota para excluir um produto pelo código [APENAS PARA DEMONSTRAÇÃO, NÃO UTILIZAR EM PRODUÇÃO]
router.delete('/:id', commentController.delete)

module.exports = router

// Path: src\routes\commentRouter.js