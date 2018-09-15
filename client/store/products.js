import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS';
/**
 * INITIAL STATE
 */
const initialProductState = {
  allProducts: [],
  selected: {},
  orderItems: [],
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

const getOrderItems = orderItems => ({
  type:GET_ORDER_ITEMS,
  orderItems
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

export const addProductToCart = (productId, quantity=1) => async dispatch => {
  try{
    // check if user is logged-in or not.
    const res = await axios.get('/auth/me')
    const user = res.data;

    if(!user){
      // user logged-out
      let orderItems = localStorage.getItem('order-items');

      let selectedItem = {productId, quantity};
      if(!orderItems){
        localStorage.setItem('order-items', JSON.stringify([selectedItem]));

      }else{
        // check any duplicates and add the selected item to the list.
        let itemFound = false;
        let items = JSON.parse(orderItems);
        for(let item of items){
          if(item.productId === productId){
            item.quantity = quantity;
            itemFound = true;
          }
        }

        // add the selected product to the list.
        if(!itemFound) items = [...items, selectedItem];

        localStorage.setItem('order-items', JSON.stringify(items));
      }

      orderItems = localStorage.getItem('order-items');
      dispatch(getOrderItems(JSON.parse(orderItems)));
    }else{
      // user logged-in
      const pendingOrder = await axios.get(`/api/users/${user.id}/orders?status=pending`);
      if(!pendingOrder){

      }else{
        // check if there is a temporary cart in the local storage
        let orderItems = localStorage.getItem('order-items');
        if(orderItems){
          // merge orderItems into pendingOrder

          // delete the localStorage
        }else{
          //add item to the pending cart
        }
      }
    }

  }catch(error){
    console.error(error);
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
    case GET_ORDER_ITEMS:
      return {
        ...state,
        orderItems: action.orderItems
      }
    default:
      return state
  }
}

export default products;
