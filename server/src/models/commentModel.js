const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
	},
	rating: {
		type: Number,
		required: true,
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
	},
	date: {
		type: Date,
		default: Date.now,
	},
	details: String,
	ativo:{
		type: Boolean,
		default: true,
	}

})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
