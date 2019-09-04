'use strict'

var mongoose = require('mongoose')

function drop (cb) {
  var IngredientFactory = require('./IngredientSeed')
  var IngredientModel = mongoose.model('Ingredient')
  // var CocktailModel = mongoose.model('Cocktail')

  IngredientModel.remove({}).exec()
    .then(function (doc) {
      IngredientModel.create([
        IngredientFactory().ingredient1,
        IngredientFactory().ingredient2,
        IngredientFactory().ingredient3,
        IngredientFactory().ingredient4,
        IngredientFactory().ingredient5,
        IngredientFactory().ingredient6
      ])
        .then(function (ingredients) {
          if (cb) {
            cb(ingredients)
          }
        })
        .then(null, function (err) {
          if (cb) {
            cb(new Error(err.message))
          }
        })
    })
}

module.exports = {
  drop: drop
}
