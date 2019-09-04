if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'gitlab') {
  require('dotenv').load()
}

const express = require('express')
const mongoose = require('mongoose')
const db = require('./config/database')
const pug = require('pug')
const path = require('path')
const router = require('./src/routes')

// use normal Promises instead of built in Promises
mongoose.Promise = Promise

const app = express()

app.use('/static', express.static(__dirname + '/static'))
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'pug')

// routes are defined in routes.js
app.use('/', router)

// Connect to database via mongoose (first get database string depending on environment)
db.connect()

app.listen(process.env.PORT, () => console.log('App running on port ' + process.env.PORT + ' with Environment ' + process.env.NODE_ENV))

module.exports = app
