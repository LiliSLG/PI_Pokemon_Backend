import axios from "axios";
import { PUT_POKEMON } from "../action-types";

const URL_API = "/pokemons";

export const updatePokemon = (pokemon) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      const updatedPokemon = (await axios.put(`${URL_API}/${pokemon.id}`, pokemon)).data;
      dispatch({
        type: PUT_POKEMON,
        payload: updatedPokemon,
      });
    } catch (error) {
      alert("Error updating Pokemon.", error.message);
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
