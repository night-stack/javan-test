import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, GET_ITEM } from "../actions/type";

const initialState = {
  carts: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
