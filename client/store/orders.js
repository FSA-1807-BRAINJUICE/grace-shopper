import axios from 'axios'

const initialOrdersState = {
  orderList: []
}

const GET_ORDERS = 'GET_ORDERS'

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const getOrdersThunk = () => async dispatch => {
  try{
    const response = await axios.get(`/api/products`); //which route?
    const parsedOrders = response.data;
    const action = getOrders(parsedOrders);
    dispatch(action);
  } catch (err) {
    console.error(err)
  }
}

const orders = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orderList: action.orders}
    default:
      return state
  }
}

export default orders;
