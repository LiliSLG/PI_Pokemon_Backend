import axios from "axios";
import { URL_API } from "../../../constants";
import { actionTypes } from "../../action-types";
import { handleSetFooterAppStatus } from "../../../handlers/handleFooterMessages";


// const URL_API = "/pokemons";

export const pokemonDelete = (pokemonId) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      handleSetFooterAppStatus(dispatch, "DELETING POKEMON", 2);
      const deletedPokemon = (await axios.delete(`${URL_API}/${pokemonId}`)).data;
      dispatch({
        type: actionTypes.DEL_POKEMON,
        payload: pokemonId,
      });
      handleSetFooterAppStatus(dispatch, "POKEMON DELETED", 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR DELETING POKEMON", 3);
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
