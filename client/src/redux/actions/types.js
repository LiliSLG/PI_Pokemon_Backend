import axios from "axios";
import { actionTypes } from "../action-types";
import { saveTypesStateToLocalStorage } from "../../utils/localStorage";
import { handleSetFooterAppStatus } from "../../handlers/handleFooterMessages";

const URL_API = "/type";

export const getTypes = () => {
  return async (dispatch) => {
    try {
      handleSetFooterAppStatus(dispatch, "LOADING TYPES", 2);
      const types = (await axios(URL_API)).data;
      dispatch({ type: actionTypes.GET_TYPES, payload: types });
      saveTypesStateToLocalStorage(types);
      handleSetFooterAppStatus(dispatch, "TYPES LOADED", 1);
    } catch (error) {
      handleSetFooterAppStatus(dispatch, "ERROR LOADING TYPES", 3);
      alert("Error obtaining types", error.message);
    }
  };
};

export const getTypesFromLocalStore = (types) => {
  return {
    type: actionTypes.GET_TYPES,
    payload: types,
  };
};
