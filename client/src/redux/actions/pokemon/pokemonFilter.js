import { actionTypes } from "../../action-types";
import { handleSetFooterAppStatus } from "../../../handlers/handleFooterMessages";

export const pokemonApplyFilters = (filter, value) => (dispatch) => {
  // const filters = { filterByName: "filterByName", filterByOrigin: "filterByOrigin" };

  try {
    handleSetFooterAppStatus(dispatch, `FILTERING BY ${filter}: ${value}`, 2);
    dispatch({
      type: actionTypes.APPLY_FILTERS,
      payload: { filter, value },
    });
    handleSetFooterAppStatus(dispatch, `FILTERED BY ${filter}: ${value}`, 1);
    return Promise.resolve();
  } catch (error) {
    handleSetFooterAppStatus(
      dispatch,
      `ERROR FILTERING BY ${filter}: ${value}`,
      3
    );
    alert("Error filtering Pokemons.", error.message);
    return Promise.reject();
  }
};

export const resetFilters = () => (dispatch) => {
  handleSetFooterAppStatus(dispatch, `FILTERS CLEAN`, 1);
  dispatch({
    type: actionTypes.CLEAR_FILTERS,
  });
  return Promise.resolve();
};

export const pokemonApplyMultipleFilters =
  ({ filterByX, filterByXoperator, filterByXvalue }) =>
  (dispatch) => {
    // const filters = { filterByName: "filterByName", filterByOrigin: "filterByOrigin" };
    try {
      handleSetFooterAppStatus(
        dispatch,
        `FILTERING BY ${filterByX}: ${
          filterByXoperator + " " + filterByXvalue
        }`,
        2
      );
      dispatch({
        type: actionTypes.APPLY_MULTIPLE_FILTERS,
        payload: { filterByX, filterByXoperator, filterByXvalue },
      });
      handleSetFooterAppStatus(
        dispatch,
        `FILTERED BY ${filterByXoperator + " " + filterByXvalue}`,
        1
      );
      return Promise.resolve();
    } catch (error) {
      handleSetFooterAppStatus(
        dispatch,
        `ERROR FILTERING BY ${filterByXoperator + " " + filterByXvalue}`,
        3
      );
      alert("Error filtering Pokemons.", error.message);
      return Promise.reject();
    }
  };
