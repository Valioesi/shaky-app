const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../../app')
const CocktailInitializer = require('../Cocktails/CocktailInitializer')
const IngredientInitializer = require('../Ingredients/IngredientInitializer')
const expect = chai.expect
const should = chai.should()

let testIngredients = null
let testCocktails = null
before(function (done) {
  IngredientInitializer.drop(function (seed) {
    testIngredients = seed
  })
  CocktailInitializer.drop(function (seed) {
    testCocktails = seed

    done()
  })
})

describe('test all routes', () => {
  it('should be able to call route /', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      res.should.have.status(200)
      expect(err).to.be.null
      done()
    })
  })

  it('should be able to call route /cocktails', (done) => {
    chai.request(app).get('/cocktails').end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      res.should.have.status(200)
      expect(err).to.be.null
      done()
    })
  })

  it('should be able to call route /cocktails/:id', (done) => {
    const cocktailId = testCocktails[0]._id
    chai.request(app).get('/cocktails/' + cocktailId).end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      res.should.have.status(200)
      expect(err).to.be.null
      done()
    })
  })

  it('should be able to call route /categories', (done) => {
    chai.request(app).get('/categories').end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      res.should.have.status(200)
      expect(err).to.be.null
      done()
    })
  })

  it('should be able to call route /categories/:name', (done) => {
    const category = testCocktails[0].categories
    chai.request(app).get('/categories/' + category).end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      res.should.have.status(200)
      expect(err).to.be.null
      done()
    })
  })

  it('should be able to call route /categories/:name 404', (done) => {
    const category = 'blub'
    chai.request(app).get('/categories/' + category).end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      expect(err.message).to.equal('Not Found')
      res.should.have.status(404)
      done()
    })
  })

  it('should be able to call route /cocktails/search', (done) => {
    const ingr1 = testIngredients[0].name
    chai.request(app).get('/cocktails/search?ingredients[]=' + ingr1).end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      res.should.have.status(200)
      expect(err).to.be.null
      done()
    })
  })

  it('should be able to call route /cocktails/search 404', (done) => {
    chai.request(app).get('/cocktails/search').end((err, res) => {
      expect(res.text).to.have.string('<!DOCTYPE html>')
      expect(err.message).to.equal('Not Found')
      res.should.have.status(404)
      done()
    })
  })
})
