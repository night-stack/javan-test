import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, GET_ITEM } from "./type";

const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

const editItem = (payload) => {
  return {
    type: EDIT_ITEM,
    payload,
  };
};

const deleteItem = (payload) => {
  return {
    type: DELETE_ITEM,
    payload,
  };
};

const getItem = (payload) => {
  return {
    type: GET_ITEM,
    payload,
  };
};

export { addItem, deleteItem, editItem, getItem };
