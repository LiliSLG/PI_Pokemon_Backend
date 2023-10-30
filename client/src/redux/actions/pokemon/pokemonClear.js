import { actionTypes } from "../../action-types";


export const pokemonClear = () => {
  return {
    type: actionTypes.CLEAR_POKEMON,
    payload: {},
  };
};