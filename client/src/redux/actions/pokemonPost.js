import axios from "axios";
import { POST_POKEMON } from "../action-types";

const URL_API = "/pokemons";

export const createPokemon = (pokemon) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      const newPokemon = (await axios.post(URL_API, pokemon)).data;
      dispatch({
        type: POST_POKEMON,
        payload: newPokemon,
      });
    } catch (error) {
      alert("Error creating a new Pokemon.", error.message);
    }
  };
};

//CON PROMESAS REVISAR
// export const createPokemon = (pokemon) => {
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
