import axios from "axios";
import { URL_API } from "../../../constants";
import { actionTypes } from "../../action-types";
import { handleSetFooterAppStatus } from "../../../handlers/handleFooterMessages";

// const URL_API = "/pokemons";

export const pokemonSaveToBdd = (pokemon) => {
  return async function (dispatch) {
    try {
      handleSetFooterAppStatus(dispatch, "SAVING POKEMON TO BDD " + pokemon.name, 2);
      const types = pokemon.types.map((type) => type.id);
      const id = pokemon.id;
      delete pokemon.id;
      const newPokemon = (await axios.post(URL_API, {
        ...pokemon,
        types: types,
      })).data;
      dispatch({
        type: actionTypes.POST_POKEMON_FROM_API,
        payload: newPokemon.newPokemon[0]
      });
      handleSetFooterAppStatus(dispatch, "POKEMON SAVED" + pokemon.name, 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR SAVING POKEMON " + pokemon.name, 3);
      alert("Error creating a new Pokemon.", error.message);
    }
  };
};
