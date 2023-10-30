import axios from "axios";
import { URL_API } from "../../../constants";
import { actionTypes } from "../../action-types";
import { handleSetFooterAppStatus } from "../../../handlers/handleFooterMessages";

// const URL_API = "/pokemons";

export const updatePokemon = (pokemon) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      handleSetFooterAppStatus(dispatch, "UPDATING POKEMON " + pokemon.name, 2);
      const updatedPokemon = (
        await axios.put(`${URL_API}/${pokemon.id}`, pokemon)
      ).data;
      dispatch({
        type: actionTypes.PUT_POKEMON,
        payload: updatedPokemon.updatedPokemon,
      });
      handleSetFooterAppStatus(dispatch, "POKEMON UPDATED " + pokemon.name, 1);
    } catch (error) {
      handleSetFooterAppStatus(
        dispatch,
        "ERROR UPDATING POKEMON " + pokemon.name,
        3
      );
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
