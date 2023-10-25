import { actionTypes } from "../action-types";

const initialState = {
  appStatus: {
    description: "READY",
    status: 1, //( 1 done, 2 in progress, 3 error) -->0 ready?
  },
  messages: [],
  // { id, description, value, icon, level, owner}
  // level: 1 normal, 2 warning, 3 danger
};

const messageFooter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_STATUS:
      return {
        ...state,
        appStatus: {
          description: action.payload.description,
          status: action.payload.status,
        },
      };
    case actionTypes.UPDATE_APP_STATUS:
      return {
        ...state,
        appStatus: {
          ...state,
          status: action.payload,
        },
      };
    case actionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case actionTypes.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
      };
    case actionTypes.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.messageId
            ? {
                ...message,
                value: action.payload.value,
                level: action.payload.level,
                visible: action.payload.visible,
              }
            : message
        ),
      };
    default:
      return state;
  }
};

export default messageFooter;
