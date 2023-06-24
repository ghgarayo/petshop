/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Comment = require('../models/commentModel')
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')

class CommentController {
	// Cria um novo comentário - Testar
	async create(req, res) {
		try {

			let { productId, grade, customerId, date, details } = req.body

			const productOnRecord = await Product.findOne({ _id: productId })

			if (!productOnRecord) {
				res.status(404).json({ message: 'Produto não encontrado' })
			}

			const customerOnRecord = await Customer.findOne({ _id: customerId })

			if (!customerOnRecord) {
				res.status(404).json({ message: 'Cliente não encontrado' })
			}

			const comment = new Comment({
				product: productId,
				grade,
				customer: customerId,
				date,
				details,
			})

			const result = await comment.save()
			res.status(201).json(result)
		} catch (error) {
			res.status(404).json({ message: error.message })
		}
	}

	async list(req, res) {
		// TODO
	}

	async getById(req, res) {
		// TODO
	}

	// async getAllByCustomerId(req, res) {
	// 	const customerId = req.params.customerId
	// 	const result = await Comment.find({ customer: customerId })
	// 	res.status(200).json(result)
	// }

	// Obtém todos os comentários do produto - testar
	async getAllByProductId(req, res) {
		const productId = req.params.productId
		
		const productCommentArray = await Comment.find({ product: productId })

		if(!productCommentArray){
			res.status(404).json({ message: 'Produto não encontrado' })
		}

		if(productCommentArray.length === 0){
			res.status(404).json({ message: 'Nenhum comentário encontrado' })
		}

		res.status(200).json(result)
	}

	async update(req, res) {

	}

	async delete(req, res) {

	}
}

module.exports = new CommentController()
