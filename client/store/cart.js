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

      orderItems = localStorage.getItem('order-items');
      dispatch(getCartItems(JSON.parse(orderItems)));
    }else{
      // user logged-in
      let pendingOrder = await axios.get(`/api/users/${user.id}/orders?status=pending`);

      let createdNewOrder = false;
      // if there is no pending order for the current logged-in user, create a new Order.
      if(!pendingOrder){
        const {data} = await axios.post('/api/orders');
        pendingOrder = data;
        createdNewOrder = true;
      }

      let orderItemsFromDB = [];
      if(!createdNewOrder) {
        // get cart items from db
        const {data} = await axios.get(`/api/orders/${pendingOrder.id}/items`);
        orderItemsFromDB = data;
      }

      // check if there is a temporary cart in the local storage
      let orderItemsFromLS = JSON.parse(localStorage.getItem('order-items'));
      if(orderItemsFromLS){
        /*
         * merge items in DB and items in LS
         */

        // find items to create in db i.e., remove any duplicates
        let foundSelectedProduct = false;
        for(let itemLS in orderItemsFromLS){
          let found = false;
          for(let itemDB in orderItemsFromDB){
            if(itemLS.proudctId === itemDB.productId){
              // update the itemDB
              itemDB.quantity += itemLS.quantity;
              await axios.put(`/api/orders/${pendingOrder.id}/items/${itemDB.id}`, itemDB);

              found = true;

              if(itemDB.productId === productId){
                foundSelectedProduct = true;
              }
            }
          }

          if(!found){
            //create itemLS in DB
            const itemToCreate = {
              quantity,
              productId
            };
            await axios.post(`/api/orders/${pendingOrder.id}/items`, itemToCreate);
          }
        }

        if(!foundSelectedProduct){
          // create a new order item of the selected product to DB, as needed!
          const itemToCreate = {
            quantity,
            productId
          };
          await axios.post(`/api/orders/${pendingOrder.id}/items`, itemToCreate);
        }

        // delete the localStorage
        localStorage.removeItem('order-items');
      }else{
        // add item to the pending cart

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
      }
    }

    const {orderItems} = await axios.get(`/api/orders/${pendingOrder.id}`);

    dispatch(getCartItems(orderItems));
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
