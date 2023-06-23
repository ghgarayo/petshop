const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		// eslint-disable-next-line no-undef
		type: Buffer,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	typeOfAnimal: {
		type: String,
		required: true,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
	ativo: {
		type: Boolean,
		default: true,
	}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product