const Ingredient = require('../models/Ingredient')
const _ = require('lodash')

const getIngredientNames = async () => {
  const ingredients = await Ingredient.find({})
  // get only names and remove duplicates
  return _.uniq(_.map(ingredients, 'name'))
}

module.exports = {
  getIngredientNames: getIngredientNames
}
