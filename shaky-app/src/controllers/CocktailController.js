const Cocktail = require('./../models/Cocktail')
// const Ingredient = require("./../models/Ingredient");
const _ = require('lodash')
// const IngredientController = require("./IngredientController");

const getCocktails = () => {
  return Cocktail.find({}).populate('ingredients')
}

const findCocktailsByIngredient = async (ingredients) => {
  let searchQuery = []
  if (ingredients === undefined) {
    const err = new Error('Please pass at least 1 ingredient.')
    err.code = 1
    throw err
  }
  if (ingredients instanceof Array) {
    searchQuery = ingredients
  } else {
    searchQuery.push(ingredients)
  }

  // make call to db to find all cocktails
  const cocktails = await Cocktail.find({}).populate('ingredients')
  // filter through the cocktails, so that we only return the ones with all the ingredients
  const cocktailsWithAllIngredients = filterCocktailsByIngredient(cocktails, searchQuery)

  let foundCocktails = []
  // if no cocktails were found, we want to check if there are cocktails found for fewer ingredients
  if (cocktailsWithAllIngredients.length === 0) {
    let alteredSearchQuery
    let deletedIngredient
    let filteredCocktails
    for (let i = 0; i < searchQuery.length; i++) {
      // clone array
      alteredSearchQuery = searchQuery.slice()
      // in this array remove the element at the index
      deletedIngredient = alteredSearchQuery.splice(i, 1)[0]
      filteredCocktails = filterCocktailsByIngredient(cocktails, alteredSearchQuery)
      if (filteredCocktails.length > 0) {
        foundCocktails.push({
          'without': deletedIngredient,
          'cocktails': filteredCocktails
        })
      }
    }
  }

  return {
    'all': cocktailsWithAllIngredients,
    'others': foundCocktails,
    'query': searchQuery
  }
}

const filterCocktailsByIngredient = (cocktails, searchQuery) => {
  let foundCocktails = []
  cocktails.forEach(cocktail => {
    let cocktailFound = true
    // get only names of ingredients
    let ingredientsOfCocktail = _.map(cocktail.ingredients, 'name')
    searchQuery.forEach(element => {
      // if the ingredient is not part of the cocktail, then this one is not it
      if (!ingredientsOfCocktail.includes(element)) {
        cocktailFound = false
      }
    })

    if (cocktailFound) {
      foundCocktails.push(cocktail)
    }
  })
  return foundCocktails
}

const getSingle = (id) => {
  return Cocktail.findOne({
    _id: id
  }).populate('ingredients')
}

const getAllCategories = async () => {
  // first get all cocktails, then exract the categories without duplicates
  const cocktails = await Cocktail.find({})
  let categories = []
  cocktails.forEach(cocktail => {
    categories = categories.concat(cocktail.categories)
  })
  // remove duplicates
  return _.uniq(categories)
}

const getCocktailsByCategory = async (category) => {
  return Cocktail.find({
    categories: category
  })
}

module.exports = {
  getCocktails,
  getSingle,
  findCocktailsByIngredient,
  getAllCategories,
  getCocktailsByCategory
}
