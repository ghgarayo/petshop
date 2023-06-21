const express = require('express')
const router = express.Router()
const AuthenticationController = require('../controllers/AuthenticationController')

// Rota para efetuar login
router.post('/', AuthenticationController.login)

module.exports = router