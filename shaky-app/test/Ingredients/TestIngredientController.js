const chai = require('chai')
let chaiHttp = require('chai-http')
// const app = require('./../../app')
const ingredientController = require('./../../src/controllers/IngredientController')
// const should = chai.should()
// const db = require('./../../config/database')
const mongoose = require('mongoose')
const IngredientInitializer = require('./IngredientInitializer')
const CocktailInitializer = require('../Cocktails/CocktailInitializer')

mongoose.Promise = Promise

chai.use(chaiHttp)

var testIngredients = null
var testCocktails = null

before(function (done) {
  IngredientInitializer.drop(function (seed) {
    testIngredients = seed
  })
  CocktailInitializer.drop(function (seed) {
    testCocktails = seed

    done()
  })
})

describe('test ingredient controller', () => {
  it('get ingredient names should work', async () => {
    const ingredients = await ingredientController.getIngredientNames()
    ingredients.should.be.a('array')
    ingredients[0].should.be.a('string')
  })
})
