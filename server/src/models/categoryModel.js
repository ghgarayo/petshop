const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new mongoose.Schema({
  nomeCategoria: {
    type: String,
    required: true,
    unique: true,
  },
  descricao: {
    type: String,
    required: true,
  },
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
