const express = require('express')
const router = express.Router()
const ingredientController = require('./controllers/IngredientController')
const cocktailController = require('./controllers/CocktailController')

const renderCallback = (res, err, html) => {
  if (err) {
    res.status(500).render('500')
  } else {
    res.send(html)
  }
}

router.get('/', async (req, res) => {
  try {
    const ingredients = await ingredientController.getIngredientNames()
    res.render('index', {
      ingredients: ingredients
    }, (err, html) => renderCallback(res, err, html))
  } catch (err) {
    res.status(500).render('500')
  }
})

router.get('/cocktails/search', async (req, res) => {
  try {
    const cocktails = await cocktailController.findCocktailsByIngredient(req.query.ingredients)

    let ingredientString = ''
    let suffix = ''
    cocktails.query.forEach(ingredient => {
      ingredientString += suffix + ingredient
      suffix = ', '
    })

    if (cocktails.all.length === 0 && cocktails.others.length === 0) {
      res.render('cocktails', {
        title: 'Results',
        cocktails: cocktails.all,
        ingredients: cocktails.query,
        text: 'No results found for the given ingredients.',
        query: ingredientString
      })
    } else {
      res.render('cocktails', {
        title: 'Results',
        cocktails: cocktails.all, // with all ingredients
        otherCocktails: cocktails.others, // with ingredients missing
        ingredients: cocktails.query,
        text: 'No cocktails found with all ingredients, but with...',
        query: ingredientString
      })
    }
  } catch (err) {
    console.log(err.message)
    if (err.code === 1) {
      res.status(404).render('404', {
        errorMsg: err.message
      })
    } else {
      res.sendStatus(500)
    }
  }
})

router.get('/cocktails', async (req, res) => {
  try {
    const cocktails = await cocktailController.getCocktails()
    res.render('cocktails', {
      title: 'Cocktails',
      cocktails: cocktails
    })
  } catch (err) {
    res.status(500).render('500')
  }
})

router.get('/cocktails/:id', async (req, res) => {
  try {
    const cocktail = await cocktailController.getSingle(req.params.id)
    if (!cocktail) {
      res.render('404')
    } else {
      res.render('cocktail', {
        cocktail: cocktail
      })
    }
  } catch (err) {
    res.status(500).render('500')
  }
})

router.get('/categories', async (req, res) => {
  try {
    const categories = await cocktailController.getAllCategories()
    res.render('categories', {
      title: 'Categories',
      categories: categories
    })
  } catch (err) {
    res.status(500).render('500')
    console.log(err)
  }
})

router.get('/categories/:name', async (req, res) => {
  try {
    const cocktails = await cocktailController.getCocktailsByCategory(req.params.name)
    if (cocktails.length !== 0) {
      res.render('cocktails', {
        title: 'Cocktails',
        cocktails: cocktails
      })
    } else {
      res.status(404).render('404')
    }
  } catch (err) {
    res.status(500).render('500')
  }
})

router.all('*', (req, res) => {
  res.status(404).render('404')
})

module.exports = router
