/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Category = require('../models/categoryModel')

class CategoryController {
    
    // Criar uma nova categoria - OK
    async create(req, res) {
        try {
            console.log(req.body)
            const categoryToBeCreated = req.body
            const result = await Category.create(categoryToBeCreated)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Retornar a lista completa de categorias - OK
    async list(req, res) {
        try {
            const categorias = await Category.find()
            res.json(categorias)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Retornar uma categoria pelo código - OK
    async getById(req, res) {
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

    // Editar uma categoria existente - OK
    async update(req, res) {
        try {
            const { id } = req.params.id
            // console.log(req.params)

            const categoryOnRecord = await Category.findOne(id)
            // console.log(categoryOnRecord)

            if (!categoryOnRecord) {
                return res.status(404).json({ message: 'Categoria não encontrada' })
            }

            const dataToUpdate = req.body

            if (dataToUpdate.name && dataToUpdate.name != categoryOnRecord.name) {
                categoryOnRecord.name = dataToUpdate.name
            }

            if (
                dataToUpdate.description &&
        dataToUpdate.description != categoryOnRecord.description
            ) {
                categoryOnRecord.description = dataToUpdate.description
            }

            const updatedCategory = await categoryOnRecord.save()

            res
                .status(200)
                .json(
                    await Category.findOneAndUpdate(
                        updatedCategory._id,
                        updatedCategory,
                        { new: true }
                    )
                )

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Inativar uma categoria - OK
    async inactivate(req, res) {
        try {
            const codigo = req.params.codigo
            const categoryOnRecord = await Category.findOne({ codigo })
    
            if (!categoryOnRecord) {
                return res.status(404).json({ message: 'Categoria não encontrada' })
            }
    
            categoryOnRecord.active = false
    
            const updatedCategory = await categoryOnRecord.save()
    
            res.status(200).json(updatedCategory)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    
    // Excluir uma categoria - OK
    async delete(req, res) {
        try {
            const codigo = req.params.codigo
            const categoryOnRecord = await Category.findOne({ codigo })
    
            if (!categoryOnRecord) {
                return res.status(404).json({ message: 'Categoria não encontrada' })
            }
    
            await Category.findByIdAndRemove(categoryOnRecord._id)
    
            res.status(200).json({ message: 'Categoria excluída com sucesso' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new CategoryController()
