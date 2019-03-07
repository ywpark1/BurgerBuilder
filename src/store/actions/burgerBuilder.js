import { ActionTypes as actionTypes } from './actionTypes';
import axios from '../../axios-orders';

export const ingredientActions = {
  addIngredient: ingName => {
    return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    };
  },
  removeIngredient: ingName => {
    return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    };
  },
  setIngredients: ingredients => {
    // console.log(ingredients);
    return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients
    };
  },

  initIngredients: () => {
    return async dispatch => {
      try {
        const res = await axios.get(
          'https://react-burger-95f7f.firebaseio.com/ingredients.json'
        );
        // console.log(res.data);
        dispatch(ingredientActions.setIngredients(res.data));
      } catch (error) {
        dispatch(ingredientActions.fetchIngredientsFailed());
      }
    };
  },
  fetchIngredientsFailed: () => {
    return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
  }
};
