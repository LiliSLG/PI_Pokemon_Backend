import axios from "axios";
import { DEL_POKEMON } from "../action-types";

const URL_API = "/pokemons";

export const pokemonDelete = (pokemonId) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      const deletedPokemon = (await axios.delete(`${URL_API}/${pokemonId}`)).data;
      dispatch({
        type: DEL_POKEMON,
        payload: deletedPokemon,
      });
    } catch (error) {
      alert("Error deleting Pokemon.", error.message);
    }
  };
};

//CON PROMESAS REVISAR
// export const pokemonUpdate = (pokemon) => {
//   return async function (dispatch) {
//     await axios
//       .post(URL_API, pokemon)
//       .then((response) => response.data)
//       .then((respuesta) =>
//         dispatch({
//           type: POST_POKEMON,
//           payload: [respuesta.data],
//         })
//       )
//       .catch((error) => {
//         alert("Error creating a new Pokemon.", error.message);
//       });
//   };
// };
