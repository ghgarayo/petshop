const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')

/*

  As rotas deste documento devem ser acessadas a partir da rota /category

*/

// Rota para criar uma nova categoria
router.post('/', CategoryController.create)

// Rota para listar todas as categorias
router.get('/', CategoryController.list)

// Rota para obter uma categoria pelo código
router.get('/:id', CategoryController.getById)

// Rota para editar uma categoria existente
router.put('/:id', CategoryController.update)

// Rota para inativar uma categoria pelo código [USAR PATCH PARA EXCLUSÃO LÓGICA]
router.patch('/:id', CategoryController.inactivate)

// Rota para excluir uma categoria pelo código [APENAS PARA DEMONSTRAÇÃO, NÃO UTILIZAR EM PRODUÇÃO]
router.delete('/:id', CategoryController.delete)

module.exports = router
