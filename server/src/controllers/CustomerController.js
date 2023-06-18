/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Customer = require('../models/customerModel.js')

class CustomerController {
    // Criar funcionário - OK
    async create(req, res) {
        try {
            const customer = req.body
            const result = await Customer.create(customer)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Listar funcionários - OK
    async list(req, res) {
        try {
            const result = await Customer.find({})
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Obter funcionário pelo código - OK
    async getById(req, res) {
        try {
            const codigo = req.params.codigo
            const result = await Customer.findOne({ codigo })
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Atualizar funcionário pelo código - OK
    async update(req, res) {
        try {
            const codigo = req.params.codigo
            const customerOnRecord = await Customer.findOne({ codigo })

            if (!customerOnRecord) {
                return res.status(404).json({ message: 'Cliente não encontrado' })
            }

            const dataToUpdate = req.body

            if (
                dataToUpdate.fotoPerfil &&
        dataToUpdate.fotoPerfil != customerOnRecord.fotoPerfil
            ) {
                customerOnRecord.fotoPerfil = dataToUpdate.fotoPerfil
            }

            if (
                dataToUpdate.nomeCompleto &&
        dataToUpdate.nomeCompleto != customerOnRecord.nomeCompleto
            ) {
                customerOnRecord.nomeCompleto = dataToUpdate.nomeCompleto
            }

            if (
                dataToUpdate.endereco &&
        dataToUpdate.endereco != customerOnRecord.endereco
            ) {
                customerOnRecord.endereco = dataToUpdate.endereco
            }

            if (dataToUpdate.cpf && dataToUpdate.cpf != customerOnRecord.cpf) {
                customerOnRecord.cpf = dataToUpdate.cpf
            }

            if (dataToUpdate.email && dataToUpdate.email != customerOnRecord.email) {
                customerOnRecord.email = dataToUpdate.email
            }

            res
                .status(200)
                .json(
                    await Customer.findByIdAndUpdate(
                        customerOnRecord._id,
                        customerOnRecord,
                        { new: true }
                    )
                )
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async addCreditCardToCustomer(req, res) {
        try {
            console.log(
                'updateFromCreditCard - Entrou via CreditCardController: ',
                data
            )
            const customerId = data.customerId
            const _id = String((await Customer.findOne({ customerId }))._id)
            console.log('G', _id)
            // Restante do código de atualização
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Inativar funcionário pelo código - OK
    async inactivate(req, res) {
        try {
            const codigo = req.params.codigo
            const customer = await Customer.findOne({ codigo })

            if (!customer) {
                return res.status(404).json({ message: 'Cliente não encontrado' })
            }

            customer.ativo = false
            await Customer.findByIdAndUpdate(customer._id, customer, { new: true })
            res.status(200).json(customer)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Excluir funcionário pelo código - OK
    async delete(req, res) {
        try {
            const codigo = req.params.codigo
            const customer = await Customer.findOne({ codigo })

            if (!customer) {
                return res.status(404).json({ message: 'Cliente não encontrado' })
            }

            await Customer.findByIdAndRemove(customer._id)
            res.status(200).json({ message: 'Cliente deletado com sucesso' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new CustomerController()
