import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

/**
 * INITIAL STATE
 */
const initialCartState = {
  cartItems: []
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

export const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
});

/**
 * THUNK CREATORS
 */
export const getCartThunk = (cartId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${cartId}`); //which route?
    dispatch(getCart(data));
  } catch (err) {
    console.error(err)
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

      dispatch(getCartItems(JSON.parse(localStorage.getItem('order-items'))));
    }else{
      // user logged-in

      // find the pending order of this current logged-in user
      let pendingOrder;

      let pendingOrders = await axios.get(`/api/users/${user.id}/orders?status=pending`);
      // if there is no pending order for the current logged-in user, create a new Order.
      if(!pendingOrders || pendingOrders.length === 0){
        // if there is no pending order, then create one.
        const {data} = await axios.post('/api/orders');
        pendingOrder = data;
      }else{
        pendingOrder = pendingOrders[0];
      }

      // check if there is a duplicate
      let foundDuplicate = false;
      for(let item of pendingOrder.orderItems){
        if(item.productId === productId){
          item.quantity = item.quantity + quantity;
          await axios.put(`/api/orders/${pendingOrder.id}/items/${item.id}`, item);
          foundDuplicate = true;
          break;
        }
      }

      if(!foundDuplicate){
        // create an item with the pending order id
        const orderItem = {
          quantity,
          productId,
        }

        await axios.post(`/api/orders${pendingOrder.id}/items`, orderItem);
      }
      let {orderItems} = await axios.get(`/api/orders/${pendingOrder.id}`);

      dispatch(getCartItems(orderItems));
    }
  }catch(error){
    console.error(error);
  }
}

/**
 * REDUCER
 */
const cart = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {...state, cartItems: [...state.cartItems, action.item]}
    case GET_CART:
      return {...state, cartItems: action.cart}
    case GET_CART_ITEMS:
      return {...state, cartItems: action.cartItems}
    default:
      return state
  }
}

export default cart;
