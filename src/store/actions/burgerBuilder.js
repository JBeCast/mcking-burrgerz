// Action creators for building a burger
import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient: ingredient
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient: ingredient
});