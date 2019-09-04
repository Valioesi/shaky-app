/**
 * model for ingredient
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ingredientSchema = new Schema({
  name: String,
  amount: Number,
  unit: String
})

module.exports = mongoose.model('Ingredient', ingredientSchema)
