const Order = require('../models/orderModel')

class OrderController {
	async create(req, res) {
		try {
			let { customer, date, order, status, total } = req.body

			const orderToDb = new Order({
				customer: customer,
				date: date,
				order: order,
				status: status,
				total: total,
			})

			const result = await orderToDb.save()
			res.status(201).json(result)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	async list(req, res) {
		const result = await Order.find({})

		if (result.length === 0) {
			res.status(404).json({ message: 'Nenhum pedido encontrado' })
		}
		res.status(200).json(result)
	}

	async getById(req, res) {
		const orderId = req.params.id

		const orderOnRecord = await Order.findOne({ _id: orderId })

		if (!orderOnRecord) {
			res.status(404).json({ message: 'Pedido não encontrado' })
		}

		res.status(200).json(orderOnRecord)
	}

	async updateStatus(req, res) {
		try {
			const orderId = req.params.id

			const orderOnRecord = await Order.findOne({ _id: orderId })

			if (!orderOnRecord) {
				res.status(404).json({ message: 'Pedido não encontrado' })
			}

			const { status } = req.body

			orderOnRecord.status = status

			const result = await orderOnRecord.findByIdAndUpdate(
				orderId,
				orderOnRecord,
				{ new: true }
			)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}

module.exports = new OrderController()
