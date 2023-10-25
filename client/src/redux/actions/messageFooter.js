import { actionTypes } from "../action-types";

export const setAppStatus = (description, status) => {
  return {
    type: actionTypes.SET_APP_STATUS,
    payload: { description, status },
  };
};

export const updateAppStatus = (status) => ({
  type: actionTypes.UPDATE_APP_STATUS,
  payload: { status },
});

export const addMessage = (message) => ({
  type: actionTypes.ADD_MESSAGE,
  payload: message,
});

export const deleteMessage = (messageId) => ({
  type: actionTypes.DELETE_MESSAGE,
  payload: messageId,
});

export const updateMessage = (messageId, value, level, visible) => ({
  type: actionTypes.UPDATE_MESSAGE,
  payload: { messageId, value, level, visible },
});
