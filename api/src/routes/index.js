const { Router } = require('express');
let { Recipe, Diet } = require("../db")
const { Op } = require('sequelize');
const axios = require("axios");
const { loadDefault, loadRecipe } = require('../tools');
// require('dotenv').config()
// Importar todos los routers;
const router = Router();
// Configurar los routers

router.get('/recipes', async (req, res) => {
  const { name } = req.query
  try {
    if (await Recipe.count() === 0) {
      await loadDefault()
    }
    if (!name) {
      const allRecipes = await Recipe.findAll({
        include: {
          model: Diet,
          attributes: ['name']
        }
      })
      return res.status(200).json(allRecipes)
    }
    const apiGet = await axios.get("https://api.spoonacular.com/recipes/complexSearch?query=" + name + "&addRecipeInformation=true&apiKey=" + process.env.API_KEY2 + "&includeNutrition=true")

    for(const e of apiGet.data.results){
      await loadRecipe(e)
    }

    const allRecipes = await Recipe.findAll({
      include:{
        model: Diet,
        attributes: ['name']
      },
      where: {
        title: {
          [Op.substring]: name.toLowerCase()
        }
      }
    })
    return res.status(200).json(allRecipes)
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
})

router.get('/recipes/:id', async (req, res) => {
  let { id } = req.params
  try {
    if (await Recipe.count() === 0) {
      await loadDefault()
    }
    const apiSearch = await axios.get("https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + process.env.API_KEY2)
    loadRecipe(apiSearch.data)
    return res.send(apiSearch.data)
  } catch (err) {
    return res.status(404).send({ message: "Not found" })
  }
})

router.get('/diets', async (req, res) => {
  try {
    if (await Diet.count() === 0) {
      await loadDefault()
    }
    const allDiets = await Diet.findAll()
    res.status(200).json(allDiets)
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
})

router.post('/recipes', async (req, res) => {
  const {
    title,
    image,
    summary,
    healthScore,
    analyzedInstructions,
    diets
  } = req.body
  if (title && summary) {
    try {
      loadRecipe({ title, image, summary, healthScore, analyzedInstructions, diets }, true)
      return res.status(200).send({ message: "Created" })
    } catch (err) {
      return res.status(400).send({ message: "Can't create the recipe" })
    }
  }
  return res.status(400).send({message: "Missing title or summary"})
})

module.exports = router;