import axios from 'axios'

const initialOrdersState = {
  orderList: [],
  completedOrder: {},
  singleOrder: {}
}

const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const SET_ORDER_DONE = 'SET_ORDER_DONE'
const CLEAR_ORDER = 'CLEAR_ORDER'

export const setOrderDone = order => ({
  type: SET_ORDER_DONE,
  order
})

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const getSingleOrder = orderNumber => ({
  type: GET_SINGLE_ORDER,
  orderNumber
})

export const clearOrder = () => ({
  type: CLEAR_ORDER
})

export const updateOrdersDone = addressInfo => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    // guest checkout
    if (!user) {
      let {data: newOrder} = await axios.post('/api/orders')
      let orderItems = JSON.parse(localStorage.getItem('order-items'))

      //create orderItems
      orderItems.forEach(async item => {
        try{
          await axios.post(`/api/orders/${newOrder.id}/items`, {
            quantity: item.quantity,
            productId: item.productId
          })
        }catch(err){
          console.log(err);
        }
      })

      //update order with address and complete status
      const {data: completedOrder} = await axios.put(
        `/api/orders/${newOrder.id}`,
        {
          ...addressInfo,
          orderStatus: 'complete'
        }
      )

      localStorage.clear()
      dispatch(setOrderDone(completedOrder))
    } else {
      //logged-in user checkout
      let {data: orders} = await axios.get(
        `/api/users/${user.id}/orders?status=pending`
      )
      let cart = orders[0]

      //update order with address and complete status
      const {data: completedOrder} = await axios.put(`/api/orders/${cart.id}`, {
        ...addressInfo,
        orderStatus: 'complete'
      })

      dispatch(setOrderDone(completedOrder))
    }
  } catch (err) {
    console.error(err)
  }
}

export const getOrdersThunk = () => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    const response = await axios.get(
      `/api/users/${user.id}/orders?status=complete`
    )
    const parsedOrders = response.data
    const action = getOrders(parsedOrders)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

const orders = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orderList: action.orders
      }
    case GET_SINGLE_ORDER:
      const targetOrder = state.orderList.filter(order => {
        return order.orderNumber === action.orderNumber
      })
      return {
        ...state,
        singleOrder: targetOrder[0]
      }
    case SET_ORDER_DONE:
      return {
        ...state,
        completedOrder: action.order
      }
    case CLEAR_ORDER:
      return {
        ...state,
        completedOrder: {}
      }
    default:
      return state
  }
}

export default orders
