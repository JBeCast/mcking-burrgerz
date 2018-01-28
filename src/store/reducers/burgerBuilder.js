import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 3,
  error: false
}

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
  });
}

const removeIngredient = (state, action) => {
  const updatedIngredientRm = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
  const updatedIngredientsRm = updateObject(state.ingredients, updatedIngredientRm);
  return updateObject(state, {
    ingredients: updatedIngredientsRm,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
  });
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      // If the order's not specified, they are sorted alphabetically by Firebase
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    error: false,
    totalPrice: 3
  });
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });  
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}

export default reducer;