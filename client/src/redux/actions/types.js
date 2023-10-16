import axios from "axios";
import { GET_TYPES } from "../action-types";

const URL_API = "/type";

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const types = (await axios(URL_API)).data;
      dispatch({ type: GET_TYPES, payload: types });
    } catch (error) {
      alert("Error obtaining types", error.message);
    }
  };
};
