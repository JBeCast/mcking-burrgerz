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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      });
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredientRm = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
      const updatedIngredientsRm = updateObject(state.ingredients, updatedIngredientRm);
      return updateObject(state, {
        ingredients: updatedIngredientsRm,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      });
    case actionTypes.SET_INGREDIENTS:
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
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
}

export default reducer;