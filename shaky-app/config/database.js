// required modules
var config = require('./config')
var mongoose = require('mongoose')

// module to expose
var databaseModule = {}

// local vars
var db

// establish the database connection
databaseModule.connect = function () {
  var connectionUrl = config.get(process.env.NODE_ENV).database

  mongoose.connect(connectionUrl)
  db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function (callback) {
    console.info('Mongoose connection successfully established')
  })
}

databaseModule.close = function () {
  db.close(function () {
    console.info('Mongoose connection disconnected')
  })
}

// expose object
module.exports = databaseModule
