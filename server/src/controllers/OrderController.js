const Product = require('../models/Product')
const Customer = require('../models/Customer')
const { list } = require('./CustomerController')

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

  
}
