/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Product = require('../models/productModel')

class ProductController {

	// Criar produto - ok
	async create(req, res) {
		try{
			const product = req.body
			const result = await Product.create(product)
			res.status(201).json(result)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// Listar todos os produtos - ok
	async list(req, res) {
		const result = await Product.find({})
		res.status(200).json(result)
	}

	async getById(req, res) {
		const code = req.params.code
		const result = await Product.findOne({ code })
		res.status(200).json(result)
	}

	async update(req, res) {
		const code = req.params.codigo
		const _id = String((await Product.findOne({ code }))._id)
	}

	async delete(req, res) {
		const codigo = req.params.codigo
		const _id = String((await Product.findOne({ codigo }))._id)
		await Customer.findByIdAndRemove(String(_id))
		res.status(200).send()
	}
}

module.exports = new ProductController()

// Path: src\controllers\ProductController.js