const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const multer = require('multer')
const upload = multer()

/* 

  As rotas deste documento devem ser acessadas a partir da rota /product

*/

// Rota para criar um novo produto
router.post('/', upload.single('image'), productController.create)

// Rota para listar todos os produtos
router.get('/', productController.list)

// Rota para obter um produto pelo código
router.get('/:id', productController.getById)

// Rota para atualizar um produto pelo código
router.put('/:id', productController.update)

// Rota para inativar um produto pelo código [USAR PATCH PARA EXCLUSÃO LÓGICA]
// router.patch('/:id', productController.inactivate)

// Rota para excluir um produto pelo código [APENAS PARA DEMONSTRAÇÃO, NÃO UTILIZAR EM PRODUÇÃO]
router.delete('/:id', productController.delete)

module.exports = router

// Path: src\routes\ProductRouter.js
