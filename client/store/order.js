import axios from 'axios'
import history from '../history'
import OrderService from '../services/OrderService';

// action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

// initial state
const initialOrderState = {
  items: {}
}

// action creators
const getItemsInOrder = (items) => ({
  type: ADD_ITEM,
  items
});

// thunks
export const addItem = (item) => async dispatch => {
  try{
    const res = await OrderService.addItem(item);
    dispatch(getItemsInOrder(res.data));
  }catch(err){
    console.error(err);
  }
}

// reducer
export default function(state = initialOrderState, action){
  switch(action.type){
    case ADD_ITEM:
      return action.items;
    default:
    return state;
  }
}
