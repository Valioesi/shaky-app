'use strict'

var mongoose = require('mongoose')
var IngredientModel = require('../../src/models/Ingredient')

function IngredientFactory () {
  var ingredient1 = {
    name: 'Rum',
    unit: 'cl',
    amout: '4'
  }

  var ingredient2 = {
    name: 'Cola',
    unit: 'cl',
    amout: '6'
  }

  var ingredient3 = {
    name: 'Rum',
    unit: 'cl',
    amout: '8'
  }

  var ingredient4 = {
    name: 'Eiswürfel',
    unit: 'handful',
    amout: '2'
  }

  var ingredient5 = {
    name: 'Eiswürfel',
    unit: 'spoons',
    amout: '4'
  }

  var ingredient6 = {
    name: 'Orangensaft',
    unit: 'cl',
    amout: '8'
  }

  return {
    ingredient1: new IngredientModel(ingredient1),
    ingredient2: new IngredientModel(ingredient2),
    ingredient3: new IngredientModel(ingredient3),
    ingredient4: new IngredientModel(ingredient4),
    ingredient5: new IngredientModel(ingredient5),
    ingredient6: new IngredientModel(ingredient6)
  }
}

module.exports = IngredientFactory
