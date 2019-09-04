/**
 * model for cocktail
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Cocktail', new Schema({
  name: String,
  description: String,
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  categories: [String],
  image: String
}))
