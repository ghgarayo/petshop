/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Comment = require('../models/commentModel')
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')

class CommentController {
	// Cria um novo comentário - ok
	async create(req, res) {
		try {
			let { product, rating, customer, details } = req.body
			const productOnRecord = await Product.findOne({ _id: product })

			if (!productOnRecord) {
				res.status(404).json({ message: 'Produto não encontrado' })
			}

			const customerOnRecord = await Customer.findOne({ _id: customer })

			if (!customerOnRecord) {
				res.status(404).json({ message: 'Cliente não encontrado' })
			}

			const comment = new Comment({
				product: product,
				rating,
				customer: customer,
				details,
			})

			const result = await comment.save()
			res.status(201).json(result)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// Lista todos os comentários - ok
	async list(req, res) {
		const result = await Comment.find({})

		if (result.length === 0) {
			res.status(404).json({ message: 'Nenhum comentário encontrado' })
		}

		res.status(200).json(result)
	}

	async getById(req, res) {
		// TODO
	}

	// async getAllByCustomerId(req, res) {
	// 	const customerId = req.params.customerId
	// 	const result = await Comment.find({ customer: customerId })
	// 	res.status(200).json(result)
	// }

	// Obtém todos os comentários do produto - Ok
	async getAllByProductId(req, res) {
		try {
			const productId = req.params.productId
			const productCommentArray = await Comment.find({ product: productId })

			if (!productCommentArray) {
				res.status(404).json({ message: 'Produto não encontrado' })
			} else if (productCommentArray.length === 0) {
				res.status(404).json({ message: 'Nenhum comentário encontrado' })
			} else {
				res.status(200).json(productCommentArray)
			}
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	async update(req, res) {}

	// Inativa um comentário - ok
	async inactivate(req, res) {
		try {
			console.log(req.params.id)
			const commentId = req.params.id
			const commentOnRecord = await Comment.findOne({ _id: commentId })
	
			if (!commentOnRecord) {
				res.status(404).json({ message: 'Comentário não encontrado' })
			}
			commentOnRecord.ativo = false
	
			const result = await Comment.findByIdAndUpdate(commentId, commentOnRecord, { new: true })
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}


	async delete(req, res) {}
}

module.exports = new CommentController()
