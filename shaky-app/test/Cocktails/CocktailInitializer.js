'use strict'

var mongoose = require('mongoose')

function drop (cb) {
  var CocktailModel = mongoose.model('Cocktail')
  // var IngredientModel = mongoose.model("Ingredient");
  var IngredientInitializer = require('../Ingredients/IngredientInitializer')

  var CocktailFactory = require('./CocktailSeed')

  CocktailModel.remove({}).exec()
    .then(function (doc) {
      IngredientInitializer.drop(function (ingredients) {
        CocktailModel.create([CocktailFactory(ingredients).cocktail1, CocktailFactory(ingredients).cocktail2])
          .then(function (cocktails) {
            if (cb) {
              cb(cocktails)
            }
          })
          .then(null, function (err) {
            if (cb) {
              cb(new Error(err.message))
            }
          })
      })
    })
}

module.exports = {
  drop: drop
}
