import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
} from "../action-types";

const URL_API = "/pokemons";

export const getPokemons = () => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      const pokemons = (await axios(URL_API)).data;
      dispatch({
        type: GET_POKEMONS,
        payload: pokemons,
      });
    } catch (error) {
      alert("Error obtaining Pokemons.", error.message);
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
      const pokemon = (await axios.get(`${URL_API}/${id}`)).data;
      dispatch({
        type: GET_POKEMON_BY_ID,
        payload: pokemon,
      });
    } catch (error) {
      alert(`Error obtaining Pokemon ${id}`, error.message);
    }
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const pokemon = (await axios(`${URL_API}/?name=${name}`)).data;
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: pokemon,
      });
    } catch (error) {
      console.error(error);
      alert(`${name} was not found in Pokemons.`, error.message);
    }
  };
};
