import axios from "axios";
import { URL_API } from "../../../constants";
import { actionTypes } from "../../action-types";
import { handleSetFooterAppStatus } from "../../../handlers/handleFooterMessages";

// const URL_API = "/pokemons";

export const createPokemon = (pokemon) => {
  return async function (dispatch) {
    //esto lo ejecuta applyMiddleware
    try {
      handleSetFooterAppStatus(dispatch, "CREATING POKEMON " + pokemon.name, 2);
      const newPokemon = (await axios.post(URL_API, pokemon)).data;
      dispatch({
        type: actionTypes.POST_POKEMON,
        payload: newPokemon,
      });      
      handleSetFooterAppStatus(dispatch, "POKEMON CREATED"+ pokemon.name, 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR CREATING POKEMON " + pokemon.name, 3);
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
