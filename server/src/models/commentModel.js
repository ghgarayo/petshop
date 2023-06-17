const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    grade: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    comment: String,
})

module.exports = mongoose.model('Comments', commentSchema)
