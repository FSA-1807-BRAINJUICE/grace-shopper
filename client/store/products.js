import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialProductState = {
  allProducts: []
}

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */
export const getAllProductsThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/products');
    const parsedAllProducts = response.data;
    const action = getAllProducts(parsedAllProducts);
    dispatch(action);
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const productsReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    default:
      return state
  }
}

export default productsReducer;
