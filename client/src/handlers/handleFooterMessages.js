import { useDispatch } from "react-redux";
import {
  setAppStatus,
  updateAppStatus,
  addMessage,
  deleteMessage,
  updateMessage,
} from "../redux/actions";

export const handleSetFooterAppStatus = (dispatch, id, status) => {
  //(1 done, 2 in progress, 3 error)
  dispatch(setAppStatus(id, status));
};

export const handleUpdateFooterAppStatus = (dispatch, status) => {
  dispatch(updateAppStatus(status));
};

export const handleAddFooterMessage = (
  dispatch,
  id,
  description,
  value,
  icon,
  level,
  owner,
  visible
) => {
  // level 1 normal, 2 warning, 3 danger
  const newMessage = {
    id,
    description,
    value,
    icon,
    level,
    owner,
    visible,
  };
  dispatch(addMessage(newMessage));
};

export const handleDeleteFooterMessage = (dispatch, messageId) => {
  dispatch(deleteMessage(messageId));
};

export const handleUpdateFooterMessage = (
  dispatch,
  messageId,
  value,
  level,
  visible
) => {
  dispatch(updateMessage(messageId, value, level, visible));
};
