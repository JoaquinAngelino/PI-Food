import axios from 'axios'
export const FIND_RECIPE_BY_ID = 'FIND_RECIPE_BY_ID'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const ORDER_BY_HEALTHSCORE = 'ORDER_BY_HEALTHSCORE'
export const ALPHABETIC_ORDER = 'ALPHABETIC_ORDER'


export const searchRecipe = (id) => {
  if (typeof id === 'undefined') {
    return async function (dispatch) {
      let r = await axios.get(`http://localhost:3001/recipes`)
      return dispatch({ type: FIND_RECIPE_BY_ID, payload: r.data })
    }
  }
  if (isNaN(Number(id))) {
    return async function (dispatch) {
      let r = await axios.get(`http://localhost:3001/recipes?name=${id}`)
      return dispatch({ type: FIND_RECIPE_BY_ID, payload: r.data })
    }
  }
  else {
    return async function (dispatch) {
      console.log("search recipe, id es un numero")
      let r = await axios.get(`http://localhost:3001/recipes/${id}`)
      return dispatch({ type: FIND_RECIPE_BY_ID, payload: r.data })
    }
  }
}

export const filterByDiet = (diet) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_DIET, payload: diet })
  }
}

export const alphabeticOrder = (ord) => {
  return function (dispatch) {
    return dispatch({ type: ALPHABETIC_ORDER, payload: ord })
  }
}

export const orderByHealthScore = (ord) => {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_HEALTHSCORE, payload: ord })
  }
}