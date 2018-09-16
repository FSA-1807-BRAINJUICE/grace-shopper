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

    let pendingOrder;
    let pendingOrders = await axios.get(`/api/users/${user.id}/orders?status=pending`);
    // Note that user should keep only one pending order in db.
    if(pendingOrders){
      pendingOrder = pendingOrders[0];

      // TODO:  in case, a user has multiple pending orders, merge all the orders into one. Once an order is merged into the pendingOrder, delete the order.
      for(let order in pendingOrders){
        if(order.id !== pendingOrder.id){
          // merge all the order items into the pendingOrder
          for(let item in order.orderItems){
            let found = false;
            for(let item2 in pendingOrder.orderItems){
              if(item.productId === item2.productId){
                found = true;
                item2.quantity += item.quantity;

                // update item2 in db
                await axios.put(`/api/orders/${pendingOrder.id}/items/${item2.id}`, item2);
                // delete item from db
                await axios.delete(`/api/orders/${item.orderId}/items/${item.id}`);
              }
            }

            if(!found){
              // change item.orderId to the pendingOrder.id
              await axios.put(`/api/orders/${item.orderId}/items/${item.id}`,
              {...item, orderId: pendingOrder.id});
            }
          }
        }
      }
    }

    // At this point, the pendingOder is the one that contains all the items selected by the user.
    // if there is any items added in the localStorage, add them to the pendingOrder as well.
    let orderItemsFromLS = JSON.parse(localStorage.getItem('order-items'));
    if(orderItemsFromLS){
      for(let itemLS in orderItemsFromLS){
        let found = false;
        for(let itemDB in orderItemsFromDB){
          if(itemLS.proudctId === itemDB.productId){
            // update the itemDB
            itemDB.quantity += itemLS.quantity;
            await axios.put(`/api/orders/${pendingOrder.id}/items/${itemDB.id}`, itemDB);
            found = true;
          }
        }

        if(!found){
          //create itemLS in DB
          await axios.post(`/api/orders/${pendingOrder.id}/items`, {quantity,productId});
        }
      }

      // delete the localStorage
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
