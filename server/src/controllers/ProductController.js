/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Product = require('../models/productModel')

class ProductController {
	// Criar produto - ok
	async create(req, res) {
		try {
			let { name, price, description, category, typeOfAnimal, image } =
				req.body
			image = req.file.buffer;

			const product = new Product({
				name,
				price,
				description,
				category,
				typeOfAnimal,
				image: Buffer.from(image, 'base64'),
			})

			const result = await product.save()
			res.status(201).json(result)
		} catch (error) {
			console.error(error)
			res.status(500).json({ mensagem: 'Erro ao cadastrar o produto.' })
		}
	}

	// Listar todos os produtos - ok
	async list(req, res) {
		const result = await Product.find({})
		res.status(200).json(result)
	}

	async getById(req, res) {
		const code = req.params.id

		try {
			const resultado = await Product.findOne({ _id: code })

			if (!resultado) {
				res
					.status(404)
					.json({ mensagem: `Produto com codigo: ${code} não encontrado!` })
			} else {
				res.status(200).json(resultado)
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ mensagem: 'Erro ao realizar busca por Codigo.' })
		}
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
