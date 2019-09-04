const chai = require('chai')
const chaiHttp = require('chai-http')
const cocktailController = require('./../../src/controllers/CocktailController')
const should = chai.should()
const expect = chai.expect
const mongoose = require('mongoose')
const CocktailInitializer = require('./CocktailInitializer')
const IngredientInitializer = require('../Ingredients/IngredientInitializer')
mongoose.Promise = Promise

chai.use(chaiHttp)

var testCocktails = null
var testIngredients = null

before(function (done) {
  IngredientInitializer.drop(function (seed) {
    testIngredients = seed
  })
  CocktailInitializer.drop(function (seed) {
    testCocktails = seed

    done()
  })
})

describe('test cocktail controller', () => {
  describe('test find cocktail by ingredient', () => {
    it('find cocktails by multiple ingredients in database should work', async () => {
      const cocktails = await cocktailController.findCocktailsByIngredient([testIngredients[0].name, testIngredients[3].name])
      cocktails.should.be.a('object')
      cocktails.should.have.property('all')
      cocktails.all.should.be.a('array')
      cocktails.all.should.be.length(2)
      cocktails.all[0].should.have.property('_id')
      cocktails.all[0].should.have.property('ingredients')
      cocktails.all[0].should.have.property('name')
    })

    it('find cocktails by one ingredient in database should work', async () => {
      const cocktails = await cocktailController.findCocktailsByIngredient([testIngredients[0].name])
      cocktails.should.be.a('object')
      cocktails.should.have.property('all')
      cocktails.all.should.be.a('array')
      cocktails.all[0].should.have.property('_id')
      cocktails.all[0].should.have.property('ingredients')
      cocktails.all[0].should.have.property('name')
    })

    it('find cocktails by 0 ingredients should throw an error', async () => {
      var result
      try {
        result = await cocktailController.findCocktailsByIngredient()
      } catch (err) {
        result = err
      }
      expect(result).to.be.an('error')
    })

    it('find cocktail alternatives when searching by ingredient should work', async () => {
      const cocktails = await cocktailController.findCocktailsByIngredient([testIngredients[0].name, testIngredients[1].name, testIngredients[3].name, testIngredients[5].name])
      cocktails.should.be.a('object')
      cocktails.should.have.property('all')
      cocktails.should.have.property('others')
      cocktails.all.should.be.a('array')
      cocktails.all.should.be.length(0)
      cocktails.others.should.be.length(2)
      cocktails.others[0].should.have.property('without')
      cocktails.others[0].should.have.property('cocktails')
      cocktails.others[0].without.should.equal(testIngredients[1].name)
      cocktails.others[0].cocktails.should.be.a('array')
      cocktails.others[0].cocktails.should.be.length(1)
      cocktails.others[0].cocktails[0].should.have.property('_id')
      cocktails.others[0].cocktails[0].should.have.property('ingredients')
      cocktails.others[0].cocktails[0].should.have.property('name')

      cocktails.others[1].should.have.property('without')
      cocktails.others[1].should.have.property('cocktails')
      cocktails.others[1].without.should.equal(testIngredients[5].name)
      cocktails.others[1].cocktails.should.be.a('array')
      cocktails.others[1].cocktails.should.be.length(1)
      cocktails.others[1].cocktails[0].should.have.property('_id')
      cocktails.others[1].cocktails[0].should.have.property('ingredients')
      cocktails.others[1].cocktails[0].should.have.property('name')
    })

    it('getting all categories should work', async () => {
      const category1 = testCocktails[0].categories[0]
      const category2 = testCocktails[1].categories[0]
      const categories = await cocktailController.getAllCategories()
      categories.should.be.a('array')
      categories[0].should.be.a('string')
      categories[1].should.be.a('string')
    })

    it('get cocktails by category should work', async () => {
      const category = testCocktails[0].categories
      const cocktails = await cocktailController.getCocktailsByCategory(category)
      cocktails.should.be.a('array')
      cocktails.should.be.length(1);
      cocktails[0].should.have.property('_id')
      cocktails[0].should.have.property('ingredients')
      cocktails[0].should.have.property('name')
    })
  })
})
