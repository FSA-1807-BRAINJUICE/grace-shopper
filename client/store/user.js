import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialUserState = {
  user: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({
  type: GET_USER,
  user
})
const removeUser = () => ({
  type: REMOVE_USER
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    mergePendingOrders(data);
    dispatch(getUser(data || initialUserState))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    mergePendingOrders(res.data);
    dispatch(getUser(res.data))
    history.push('/products')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/products')
  } catch (err) {
    console.error(err)
  }
}

// a function merge all the pending orders in db and local storage into one in db.
async function mergePendingOrders(user){
  try{
    if(!user){
      console.log("INFO: user is logged-out, only local storage is available to keep track of this user's order.");
      return;
    }

    /**
     * Note that user should keep only one pending order in db.
     * Hence, in case a user has multiple pending orders, merge all the orders into one.
     * Once an order is merged into the pendingOrder, delete the order.
     */
    let pendingOrder;
    let res = await axios.get(`/api/users/${user.id}/orders?status=pending`);
    let pendingOrders = res.data;
    if(pendingOrders){
      pendingOrder = pendingOrders[0];
      for(let order of pendingOrders){
        if(order.id !== pendingOrder.id){

          // merge all the order items into the pendingOrder
          for(let item of order.orderItems){

            let foundAndMerged = false;
            for(let item2 of pendingOrder.orderItems){

              if(item.productId === item2.productId){
                // combine quantity numbers of two OrderItems of the same product.
                item2.quantity += item.quantity;

                // update item2 in db
                await axios.put(`/api/orders/${pendingOrder.id}/items/${item2.id}`, item2);

                // delete item from db
                await axios.delete(`/api/orders/${item.orderId}/items/${item.id}`);

                foundAndMerged = true;
              }

            }

            if(!foundAndMerged){
              // change item.orderId to the pendingOrder.id
              await axios.put(`/api/orders/${item.orderId}/items/${item.id}`,
              {...item, orderId: pendingOrder.id});
            }
          }
        }
      }
    }

    // At this point, there might be a pendingOder containing all the items previously selected by the user.
    // If there is any items added in the localStorage, add them to the pendingOrder as well.
    let orderItemsFromLS = JSON.parse(localStorage.getItem('order-items'));
    if(orderItemsFromLS){
      // if no pendingOrder, then create one to save all the local storage items into.
      if(!pendingOrder){
        pendingOrder = await axios.post('/api/orders', {
          userId: user.id
        });
      }

      for(let itemLS of orderItemsFromLS){
        let foundOrderItem = false;

        if(pendingOrder.orderItems){
          for(let itemDB of pendingOrder.orderItems){
            if(itemLS.proudctId === itemDB.productId){
              // update the itemDB
              console.log("quantities: ", itemDB.quantity, itemLS.quantity);
              itemDB.quantity += itemLS.quantity;
              try{
                await axios.put(`/api/orders/${pendingOrder.id}/items/${itemDB.id}`, itemDB);
              }catch(err){
                console.log("failed to update an order - " + itemDB.id);
              }
              foundOrderItem = true;
            }
          }
        }

        if(!foundOrderItem){
          //create itemLS in DB
          const itemToCreate = {
            quantity: itemLS.quantity,
            productId: itemLS.productId
          }
          try{
            await axios.post(`/api/orders/${pendingOrder.id}/items`, itemToCreate);
          }catch(err){
            // if there are any duplicates, api will throw an exception.
            console.log(err);
          }
        }
      }

      // once all the localStorage items are saved in db, delete the order items from the localStorage.
      localStorage.removeItem('order-items');
    }

    return;
  }catch(err){
    console.log(err);
  }
}

/**
 * REDUCER
 */
export default function(state = initialUserState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user
      }
    case REMOVE_USER:
      return initialUserState
    default:
      return state
  }
}
