const axios = require("axios");
const e = require("express");
let { Recipe, Diet } = require("../db")

const loadRecipe = async (e, chargedByUser = false) => {
  const [row, created] = await Recipe.findOrCreate({
    where: { title: e.title.toLowerCase() },
    defaults: {
      image: e.image ? e.image : '',
      summary: e.summary,
      healthScore: e.healthScore ? e.healthScore : 0,
      instructions: e.analyzedInstructions[0] ? e.analyzedInstructions[0].steps : [{ step: "This recipe has no instrucions" }],
      createdByUser: chargedByUser
    }
  })

  const dietas = await Diet.findAll()

  row.addDiets(dietas.filter(el => {
    return e.diets.includes(el.name)
  }))

  return row
}

const loadDefault = async () => {
  try {
    const dietList = [
      { name: "gluten free" },
      { name: "ketogenic" },
      { name: "lacto ovo vegetarian" },
      { name: "vegan" },
      { name: "pescetarian" },
      { name: "paleolithic" },
      { name: "primal" },
      { name: "whole 30" },
      { name: "dairy free" }
    ]
    await Diet.bulkCreate(dietList)

    const apiGet = await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey="+process.env.API_KEY2+"&includeNutrition=true")
    let recipesData = apiGet.data.results.map(e => {
      return {
        title: e.title.toLowerCase(),
        image: e.image,
        summary: e.summary,
        healthScore: e.healthScore,
        instructions: e.analyzedInstructions[0] ? e.analyzedInstructions[0].steps : [{ step: "This recipe has no instrucions" }]
      }
    });
    let models = await Recipe.bulkCreate(recipesData, { returning: true })
    const dietas = await Diet.findAll()
    
    models.forEach((e, idx) => {
      e.addDiets(dietas.filter(el => {
        return apiGet.data.results[idx].diets.includes(el.name)
      }))
    })

  }catch(err){
    throw err
  }
}

module.exports = {
  loadDefault,
  loadRecipe
}