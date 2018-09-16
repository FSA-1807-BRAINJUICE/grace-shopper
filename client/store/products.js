import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

/**
 * INITIAL STATE
 */
const initialProductState = {
  allProducts: [],
  selected: {}
}

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
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

export const fetchSingleProduct = (id) => async dispatch => {
  try {
    const { data: singleProduct } = await axios.get(`/api/products/${id}`);
    dispatch(getSingleProduct(singleProduct));
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
const products = (state = initialProductState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        selected: action.product
      }
    default:
      return state
  }
}

export default products;
