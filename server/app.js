/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

require('./src/database/mongodb')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
var cors = require('cors')
const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json')

// const creditCardRouter = require('./src/routes/CreditCardRouter')
const customerRouter = require('./src/routes/customerRouter')
const categoryRouter = require('./src/routes/categoryRouter')
const productRouter = require('./src/routes/productRouter')
const commentRouter = require('./src/routes/commentRouter')
const authenticationRouter = require('./src/routes/authenticationRouter')
const orderRouter = require('./src/routes/orderRouter')

const app = express()
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// app.use('/creditCard', creditCardRouter)
app.use('/customer', customerRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/comment', commentRouter)
app.use('/login', authenticationRouter)
app.use('/order', orderRouter)

app.use(function (req, res, next) {
	console.log('Url: ', req.url)
	console.log('body: ', req.body)
	next(createError(404))
})

app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
