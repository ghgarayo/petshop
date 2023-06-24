const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
	},
	date: {
		type: Date,
		default: Date.now,
	},
	order: [{
		product:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		}
	},
	{
		quantity: {  
			type: Number,
		}
	}],
	status: {
		type: String,
		enum: ['Aguardando Pagamento', 'Faturado', 'Enviado', 'Cancelado'],
		default: 'Aguardando Pagamento',
	},
	total: {
		type: Number,
		required: true,
	},
	ativo:{
		type: Boolean,
		default: true,
	}
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order