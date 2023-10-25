import axios from "axios";
import { URL_API } from "../../../constants";
import { actionTypes } from "../../action-types";
import {
  handleSetFooterAppStatus,
  handleUpdateFooterMessage,
} from "../../../handlers/handleFooterMessages";

// const URL_API = "/pokemons";

export const getPokemons = (page, pageSize) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      handleSetFooterAppStatus(dispatch, "LOADING POKEMONS", 2);
      const pokemon = await axios(
        `${URL_API}/?getFromAPI=false&page=${page}&pageSize=${pageSize}`
      );
      dispatch({
        type: actionTypes.GET_POKEMONS,
        payload: pokemon.data,
      });
      handleUpdateFooterMessage(
        dispatch,
        "API_P",
        pokemon.data.totalPokemonsAPI,
        1,
        true
      );
      handleUpdateFooterMessage(
        dispatch,
        "DB_P",
        pokemon.data.totalPokemonsDB,
        1,
        true
      );
      handleSetFooterAppStatus(dispatch, "POKEMONS LOADED", 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR LOADING POKEMONS", 3);
      alert("Error loading Pokemons. " + error.message);
    }
  };
};

export const getPokemonsFromAPI = (page, pageSize) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      handleSetFooterAppStatus(dispatch, "LOADING API POKEMONS", 2);
      const pokemon = await axios(
        `${URL_API}/?getFromAPI=true&page=${page}&pageSize=${pageSize}`
      );
      dispatch({
        type: actionTypes.GET_POKEMONS_FROM_API,
        payload: pokemon.data,
      });
      handleSetFooterAppStatus(dispatch, "API POKEMONS LOADED", 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR LOADING API POKEMONS", 3);
      alert("Error loading API Pokemons. " + error.message);
    }
  };
};
// VERSION PROMESAS
// export const getPokemons = () => {
//   return async function (dispatch) {
//     await axios
//       .get(URL_API)
//       .then((response) => {
//         dispatch({ type: GET_POKEMONS, payload: response.data });
//       })
//       .catch((error) => {
//         alert("Error obtaining Pokemons.", error.message);
//       });
//   };
// };
export const getPokemonById = (id) => {
  return async function (dispatch) {
    try {    
      handleSetFooterAppStatus(dispatch, "LOADING POKEMON " + id.substr(0, 4), 2);
      const pokemon = await axios.get(`${URL_API}/${id}`);
      dispatch({
        type: actionTypes.GET_POKEMON_BY_ID,
        payload: pokemon.data,
      });
      handleSetFooterAppStatus(
        dispatch,
        "POKEMON " + pokemon.data.name + " LOADED",
        1
      );
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR LOADING POKEMON " + id.substr(0, 4), 3);
      alert(`Error obtaining Pokemon ${id}` + error.message);
    }
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      handleSetFooterAppStatus(dispatch, "LOADING POKEMON " + name, 2);
      const pokemon = await axios(`${URL_API}/?name=${name}`);
      dispatch({
        type: actionTypes.GET_POKEMON_BY_NAME,
        payload: pokemon.data,
      });
      //no se como actualizar la cantidad de pokes de la bd
      // handleUpdateFooterMessage(dispatch, "DB_P", pokemon.data.totalPokemonsDB, 1, true);
      handleSetFooterAppStatus(dispatch, "POKEMON " + name + " LOADED", 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR LOADING POKEMON " + name, 3);
      alert(`${name} was not found in Pokemons.` + error.message);
    }
  };
};

export const getPokemonsFromLocalStore = (pokemonData) => {
  return {
    type: actionTypes.GET_POKEMONS,
    payload: pokemonData,
  };
};
