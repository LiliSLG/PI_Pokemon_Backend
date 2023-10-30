import { actionTypes } from "../../action-types";
import { handleSetFooterAppStatus } from "../../../handlers/handleFooterMessages";

export const pokemonSort = (sort, value) => (dispatch) => {
  // const filters = { filterByName: "filterByName", filterByOrigin: "filterByOrigin" };

  try {
    handleSetFooterAppStatus(dispatch, `SORTING BY ${sort}:${value}`, 2);
    dispatch({
      type: actionTypes.APPLY_FILTERS,
      payload: { sort, value },
    });
    handleSetFooterAppStatus(dispatch, `SORTED BY ${sort}:${value}`, 1);
    return Promise.resolve();
  } catch (error) {
    handleSetFooterAppStatus(
      dispatch,
      `ERROR SORTING BY ${sort}:${value}`,
      3
    );
    alert("Error sorting Pokemons.", error.message);
    return Promise.reject();
  }
};

