import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART"

/**
 * INITIAL STATE
 */
const initialOrderState = {
  cart: []
}

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
})


/**
 * THUNK CREATORS
 */
export const getCartThunk = () => async dispatch => {
  try {
    const response = await axios.get(`/api/products`);
    const parsedCart = response.data;
    const action = getCart(parsedCart);
    dispatch(action);
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const orders = (state = initialOrderState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

export default orders;
