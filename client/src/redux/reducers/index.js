import { combineReducers } from 'redux';
import pokemon from "./pokemon";
import messageFooter from "./messageFooter";

export default combineReducers({
    pokemon,
    messageFooter
  });