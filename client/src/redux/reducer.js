import {
  FIND_RECIPE_BY_ID, FILTER_BY_DIET, ALPHABETIC_ORDER, ORDER_BY_HEALTHSCORE,
} from './actions'


const initialState = {
  recipes: [],
  filter: '',
  oldRecipes: [],
}

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FILTER_BY_DIET:
      if (state.filter === payload) {
        return {
          ...state,
          recipes: state.oldRecipes,
          filter: ''
        }
      } else {
        const filtered = state.oldRecipes.filter(e => e.diets.some(el => el.name === payload))
        return {
          ...state,
          recipes: filtered,
          filter: payload,
        }
      }


    case FIND_RECIPE_BY_ID:
      if(!payload.length){
        return state
      }
      return {
        ...state,
        recipes: payload,
        oldRecipes: payload
      }


    case ALPHABETIC_ORDER:
      let sortedName = JSON.parse(JSON.stringify(state.recipes))
      if (payload === 'asc') {
        sortedName.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (b.title > a.title) {
            return -1;
          }
          return 0;
        })
      } else {
        sortedName.sort((a, b) => {
          if (a.title > b.title) {
            return -1;
          }
          if (b.title > a.title) {
            return 1;
          }
          return 0;
        })
      }
      return {
        ...state,
        recipes: sortedName
      }


    case ORDER_BY_HEALTHSCORE:
      let sortedHealthScore = JSON.parse(JSON.stringify(state.recipes))
      if (payload === 'asc')
        sortedHealthScore.sort((a, b) => {
          if (a.healthScore > b.healthScore) {
            return 1;
          }
          if (b.healthScore > a.healthScore) {
            return -1;
          }
          return 0;
        })
      else {
        sortedHealthScore.sort((a, b) => {
          if (a.healthScore > b.healthScore) {
            return -1;
          }
          if (b.healthScore > a.healthScore) {
            return 1;
          }
          return 0;
        })
      }
      return {
        ...state,
        recipes: sortedHealthScore
      };

      
    default:
      return state
  }
}


export default rootReducer