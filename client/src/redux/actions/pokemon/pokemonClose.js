import { actionTypes } from "../../action-types";


export const pokemonClose = (pokemonId) => {
  return {
    type: actionTypes.CLOSE_POKEMON,
    payload: pokemonId,
  };
};
