const Customer = require('../models/customerModel.js')
const CreditCardController = require('./CreditCardController.js')

class CustomerController {
  async create(req, res) {
    const customer = req.body
    const max = await Customer.findOne({}).sort({ codigo: -1 })
    customer.codigo = max == null ? 1 : max.codigo + 1
    const result = await Customer.create(customer)
    res.status(201).json(result)
  }

  async list(req, res) {
    const result = await Customer.find({})
    res.status(200).json(result)
  }

  async getById(req, res) {
    const codigo = req.params.codigo
    const result = await Customer.findOne({ codigo })
    res.status(200).json(result)
  }

  async update(req, res) {
    const codigo = req.params.codigo
    const _id = String((await Customer.findOne({ codigo }))._id)
  }

  async delete(req, res) {
    const codigo = req.params.codigo
    const _id = String((await Customer.findOne({ codigo }))._id)
    await Customer.findByIdAndRemove(String(_id))
    res.status(200).send()
  }

  async createCreditCard(req, res) {
    try {
      const customerId = req.params.customerId
      const newCreditCard = req.body
      const creditCardCreated = await CreditCardController.create(newCreditCard)
      // Adiciona o cartão de crédito ao cliente
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $push: { creditCards: creditCardCreated._id } },
        { new: true },
      )
      res.status(201).json(customer)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = new CustomerController()
