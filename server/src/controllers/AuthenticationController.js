const customer = require('../models/customerModel.js')
const bcryptjs = require('bcryptjs')
const authenticationService = require('../services/authenticationService.js')

class AuthenticationController {
	async login(req, res) {
		const { email, senha } = req.body
		const customerOnRecord = await customer
			.findOne({ email: email })
			.select('+senha')
    
		if (!customerOnRecord) {
			return res.status(401).send({ error: 'Usuário não encontrado!' })
		}

		if (!(await bcryptjs.compare(senha, customerOnRecord.senha))) {
			return res.status(401).send({ error: 'Senha inválida!' })
		}

		// await authenticationService.incluirToken(customerOnRecord)

		return res
			.status(200)
			.json(await authenticationService.incluirToken(customerOnRecord))
	}
}

module.exports = new AuthenticationController()

// Path: src\controllers\AuthenticationController.js
