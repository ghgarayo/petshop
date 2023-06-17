const Category = require('../models/categoryModel')

class CategoryController {
  async cadastrarCategoria(req, res) {
    try {
      const { codigo, nome, descricao } = req.body
      const categoria = await Category.create({ codigo, nome, descricao })
      res.status(201).json(categoria)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // Editar uma categoria existente
  async editarCategoria(req, res) {
    try {
      const { codigo } = req.params
      const { nome, descricao } = req.body
      const categoria = await Category.findOneAndUpdate(
        { codigo },
        { nome, descricao },
        { new: true },
      )
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' })
      }
      res.json(categoria)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // Retornar a lista completa de categorias
  async listarCategorias(req, res) {
    try {
      const categorias = await Category.find()
      res.json(categorias)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // Retornar uma categoria pelo código
  async obterCategoriaPorCodigo(req, res) {
    try {
      const { codigo } = req.params
      const categoria = await Category.findOne({ codigo })
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' })
      }
      res.json(categoria)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = new CategoryController()
