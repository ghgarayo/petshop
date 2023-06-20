const CreditCard = require('../models/creditCardModel.js')
const CustomerController = require('./CustomerController.js')

class CreditCardController {
	// Criar um novo cartão de crédito
	async create(req, res) {
		try {
			// Adiciona o cartão de crédito ao cliente
			const updatedCustomer = await CustomerController.updateFromCreditCard(req.body)

			console.log('F', updatedCustomer)

			res.status(201).json('ok')
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// Obter todos os cartões de crédito de um cliente
	async getAll(req, res) {
		try {
			const customerId = req.params.customerId
			const cartoes = await CreditCard.find({ customerId })
			res.json(cartoes)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// Obter um cartão de crédito pelo ID
	async getById(req, res) {
		try {
			const cartaoId = req.params.id
			const cartao = await CreditCard.findById(cartaoId)
			if (!cartao) {
				return res
					.status(404)
					.json({ message: 'Cartão de crédito não encontrado' })
			}
			res.json(cartao)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// Atualizar um cartão de crédito pelo ID
	async update(req, res) {
		try {
			const cartaoId = req.params.id
			const atualizacao = req.body
			const cartaoAtualizado = await CreditCard.findByIdAndUpdate(
				cartaoId,
				atualizacao,
				{ new: true }
			)
			if (!cartaoAtualizado) {
				return res
					.status(404)
					.json({ message: 'Cartão de crédito não encontrado' })
			}
			res.json(cartaoAtualizado)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// Excluir um cartão de crédito pelo ID
	async delete(req, res) {
		try {
			const cartaoId = req.params.id
			const cartaoExcluido = await CreditCard.findByIdAndDelete(cartaoId)
			if (!cartaoExcluido) {
				return res
					.status(404)
					.json({ message: 'Cartão de crédito não encontrado' })
			}
			res.json({ message: 'Cartão de crédito excluído com sucesso' })
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}

module.exports = new CreditCardController()
