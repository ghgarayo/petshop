const jwt = require('jsonwebtoken')
const auth = require('../config/app')
const bcryptjs = require('bcryptjs')

async function incluirToken(customer) {
	const token = {
		token: await jwt.sign(
			{
				
				_id: customer._id,
				endereco: customer.endereco,
				cardHolderName: customer.cardHolderName,
				cardNumber: customer.cardNumber,
				cvc: customer.cvc,
				expirationDate: customer.expirationDate,
			},
			auth.appId,
			{
				expiresIn: 3600, // Expira em 3600 segundos ou 1 hora.
			}
		),
	}
	// customer.token = token
	// customer.senha = undefined

	return token
}

async function gerarHash(user) {
	if (typeof user.senha !== 'undefined') {
		const hash = await bcryptjs.hash(user.senha, 10)
		user.senha = hash
	}
	return user
}

function autorizar(req, res, next) {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).send({ error: 'O token não foi enviado!' })
	}

	const partes = authHeader.split(' ')

	if (partes && partes.length !== 2) {
		return res.status(401).send({ error: 'Token incompleto!' })
	}

	const [tipo, token] = partes

	if (!/^Bearer$/i.test(tipo)) {
		return res.status(401).send({ error: 'Token mal formado!' })
	}

	jwt.verify(token, auth.appId, (err, usuario) => {
		if (err) {
			return res.status(401).send({ error: 'Token inválido!' })
		}
		req.usuarioLogadoId = usuario.id
		return next()
	})
}

module.exports = {
	gerarHash,
	incluirToken,
	autorizar,
}

// Path: src\services\authenticationService.js
