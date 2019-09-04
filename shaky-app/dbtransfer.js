if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'gitlab') {
  require('dotenv').load()
}

const mongoose = require('mongoose')
const config = require('./config/config')
const Cocktail = require('./src/models/Cocktail')
const Ingredient = require('./src/models/Ingredient')
const axios = require('axios')

// use normal Promises instead of built in Promises
mongoose.Promise = Promise

// this array will hold all found ingredients and the cocktails in which they are in
// let ingredientArray = [];

// Connect to database via mongoose
mongoose.connect(config.get(process.env.NODE_ENV).database)
// const db = mongoose.connection

// drop collections
Cocktail.remove({}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Cocktail collection dropped')
  }
})

// drop collections
Ingredient.remove({}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Ingredient collection dropped')
  }
})

// do http request to cocktail api
const makeApiCall = async () => {
  try {
    const res = await axios.get('http://www.cocktailberater.de/website/cocktail?format=json')
    // dive into json structure to get array of all cocktails
    const cocktailArray = res.data.rsp.cocktails.cocktail
    // loop through array and save every cocktail in our database
    let recipe
    let jsonIngredients
    let ingredients
    let ingredientIds
    for (let cocktail of cocktailArray) {
      ingredients = []
      if (cocktail.recipes) {
        // check if there are multiple recipes, if so take the first
        recipe = cocktail.recipes.recipe[0] ? cocktail.recipes.recipe[0] : cocktail.recipes.recipe
        // check if there are any recipes
        if (recipe) {
          // get ingredients
          jsonIngredients = recipe.components.component
          // loop through the ingredients  found in the json data and add an object containing the name, amount and unit of the ingredient to the ingredients array
          jsonIngredients.forEach(ingredient => {
            ingredients.push({
              amount: ingredient['@attributes'].amount,
              unit: ingredient['@attributes'].unit,
              name: ingredient['@attributes'].name
            })
          })
          ingredientIds = []
          let createdIngredients = await Ingredient.create(ingredients)
          createdIngredients.forEach(element => {
            ingredientIds.push(element._id)
          })

          let categories = recipe.categories.recipeCategory
          let categoryNames = []
          if (categories) {
            if (categories instanceof Array) {
              categories.forEach(category => {
                categoryNames.push(category['@attributes'].name)
              })
            } else {
              categoryNames.push(categories['@attributes'].name)
            }
          }

          let name = 'name' in recipe['@attributes'] ? recipe['@attributes'].name : ''
          console.log(name)
          await Cocktail.create({
            name: name,
            description: 'description' in recipe['@attributes'] ? recipe['@attributes'].description : '',
            ingredients: ingredientIds,
            categories: categoryNames
          })
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
}

makeApiCall()
