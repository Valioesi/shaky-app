'use strict'

var CocktailModel = require('../../src/models/Cocktail')

function CocktailFactory (ingredients) {
  var cocktail1 = {
    'name': 'Cocktail 1',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    'ingredients': [ingredients[0]._id, ingredients[1]._id, ingredients[3]._id],
    'categories': 'Fun',
    'image': null
  }

  var cocktail2 = {
    'name': 'Cocktail 2',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    'ingredients': [ingredients[2]._id, ingredients[4]._id, ingredients[5]._id],
    'categories': 'Drunk',
    'image': null
  }

  return {
    cocktail1: new CocktailModel(cocktail1),
    cocktail2: new CocktailModel(cocktail2)
  }
}

module.exports = CocktailFactory
