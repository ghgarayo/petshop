const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')

// Rota: POST /categoria
// Descrição: Cadastrar uma nova categoria
router.post('/', CategoryController.cadastrarCategoria)

// Rota: PUT /categoria/:codigo
// Descrição: Editar uma categoria existente
router.put('/:codigo', CategoryController.editarCategoria)

// Rota: GET /categoria
// Descrição: Retornar a lista completa de categorias
router.get('/', CategoryController.listarCategorias)

// Rota: GET /categoria/:codigo
// Descrição: Retornar uma categoria pelo código
router.get('/:codigo', CategoryController.obterCategoriaPorCodigo)

module.exports = router
