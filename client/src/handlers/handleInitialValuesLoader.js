import {
  getPokemons,
  getTypes,
  getTypesFromLocalStore,
} from "../redux/actions";
import {
  handleSetFooterAppStatus,
  handleAddFooterMessage,
} from "./handleFooterMessages";

import { loadTypesStateFromLocalStorage } from "../utils/localStorage";

export const loadPokemonInitialValues = async (dispatch) => {
  handleSetFooterAppStatus(dispatch, "INITIAL LOADING", 2);
  const storedTypesData = loadTypesStateFromLocalStorage();
  if (storedTypesData) {
    dispatch(getTypesFromLocalStore(storedTypesData));
  } else {
    dispatch(getTypes()); //si no los tengo en localstore los busco en la bdd
  }
  dispatch(getPokemons(1, 50));
  handleAddFooterMessage(
    dispatch,
    "API_P",
    "API Poks",
    0,
    "\uD83D\uDCBF",
    1,
    "/home",
    true
  );

  handleAddFooterMessage(
    dispatch,
    "DB_P",
    "DB Poks",
    0,
    "\uD83D\uDC40",
    1,
    "/home",
    true
  );

  handleAddFooterMessage(
    dispatch,
    "ST_P",
    "State Poks",
    0,
    "\uD83D\uDCBD",
    1,
    "/home",
    true
  );

  handleAddFooterMessage(
    dispatch,
    "FI_P",
    "Filter Poks",
    0,
    "\u2699",
    1,
    "/home",
    false //viisble
  );

  handleSetFooterAppStatus(dispatch, "READY", 1);
};

// const persistedPaginationData = loadPaginationDataFromLocalStorage();

// if (persistedPaginationData) {
//   dispatch(setPaginationData(persistedPaginationData));
// }

// export default loadInitialValues;
