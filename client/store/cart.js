import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
/**
 * INITIAL STATE
 */
const initialCartState = {
  cartItems: [],
  cart: {}
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

export const clearCart = () => ({
  type: CLEAR_CART
})

export const getCartItems = orderItems => ({
  type: GET_CART_ITEMS,
  orderItems
})

export const updateItemQuantity = (item, quantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  item,
  quantity
})

/**
 * THUNK CREATORS
 */
export const getCartThunk = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const user = res.data

    if (user) {
      const {data} = await axios.get(
        `/api/users/${user.id}/orders?status=pending`
      )
      dispatch(getCart(data[0]))
    } else {
      let cartItems = localStorage.getItem('order-items') //[{productId, quantity}]
      let orderItems = []

      cartItems = JSON.parse(cartItems)
      let id = 1
      for (let item of cartItems) {
        let productRes = await axios.get(`/api/products/${item.productId}`)
        let product = productRes.data
        let orderItem = {
          product,
          quantity: item.quantity,
          productId: item.productId
        }
        orderItem.id = id++
        orderItems.push(orderItem)
      }

      const cart = {orderItems}
      dispatch(getCart(cart))
    }
  } catch (err) {
    console.log(err)
  }
}

export const addProductToCart = (productId, quantity = 1) => async dispatch => {
  try {
    // check if user is logged-in or not.
    const res = await axios.get('/auth/me')
    const user = res.data

    if (!user) {
      // user logged-out
      let orderItems = localStorage.getItem('order-items')

      let selectedItem = {productId, quantity}
      if (!orderItems) {
        localStorage.setItem('order-items', JSON.stringify([selectedItem]))
      } else {
        // check any duplicates and add the selected item to the list.
        let itemFound = false
        let items = JSON.parse(orderItems)
        for (let item of items) {
          if (item.productId === productId) {
            item.quantity = quantity
            itemFound = true
          }
        }

        // add the selected product to the list.
        if (!itemFound) items = [...items, selectedItem]
        localStorage.setItem('order-items', JSON.stringify(items))
      }

      // TODO: add a Product instance to each orderItem.
      const localItems = JSON.parse(localStorage.getItem('order-items'))
      let itemsWithProduct = []
      let i = 1
      for (let item of localItems) {
        let orderItem = {...item}

        let {data} = await axios.get(`/api/products/${item.productId}`)
        orderItem.product = data
        orderItem.id = i++

        itemsWithProduct.push(orderItem)
      }

      dispatch(getCartItems(itemsWithProduct))
    } else {
      // user logged-in

      // find the pending order of this current logged-in user
      let pendingOrder

      let res = await axios.get(`/api/users/${user.id}/orders?status=pending`)
      let pendingOrders = res.data

      // if there is no pending order for the current logged-in user, create a new Order.
      if (!pendingOrders || pendingOrders.length === 0) {
        // if there is no pending order, then create one.
        let res = await axios.post('/api/orders')
        pendingOrder = res.data
      } else {
        pendingOrder = pendingOrders[0]
      }

      // check if there is a duplicate
      let foundDuplicate = false
      if (pendingOrder.orderItems) {
        for (let item of pendingOrder.orderItems) {
          if (item.productId === productId) {
            item.quantity = item.quantity + quantity
            await axios.put(
              `/api/orders/${pendingOrder.id}/items/${item.id}`,
              item
            )
            foundDuplicate = true
            break
          }
        }
      }

      if (!foundDuplicate) {
        // create an item with the pending order id
        const orderItem = {
          quantity,
          productId
        }
        try {
          await axios.post(`/api/orders/${pendingOrder.id}/items`, orderItem)
        } catch (err) {
          console.log('failed to add a product - ' + productId)
        }
      }
      let {data} = await axios.get(`/api/orders/${pendingOrder.id}`)
      dispatch(getCartItems(data.orderItems))
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateItem = (targetItem, quantity) => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const user = res.data

    let orderItems
    if (!user) {
      // simply update item quantity in the local storage.
      const orderItemsLS = JSON.parse(localStorage.getItem('order-items'))
      orderItems = []
      if (orderItemsLS) {
        let i = 1
        for (let item of orderItemsLS) {
          if (item.productId === targetItem.productId) {
            item.quantity = quantity
          }

          // adding product info to the orderItems to return to the React component
          let orderItem = {...item}
          let {data} = await axios.get(`/api/products/${item.productId}`)
          orderItem.product = data
          orderItem.id = i++
          orderItems.push(orderItem)
        }

        localStorage.setItem('order-items', JSON.stringify(orderItemsLS))
      }
    } else {
      /**
       *  update quantity in db.
       */

      // retrieve the item from db by itemId.
      const updatedItem = await axios.get(
        `/api/orders/${targetItem.orderId}/items/${targetItem.id}`
      )

      // update the quantity
      updatedItem.quantity = quantity

      // invoke put method to update
      await axios.put(
        `/api/orders/${targetItem.orderId}/items/${targetItem.id}`,
        updatedItem
      )

      // get the all items of the order.
      const {data} = await axios.get(`/api/orders/${targetItem.orderId}`)
      orderItems = data.orderItems
    }

    dispatch(getCartItems(orderItems))
  } catch (err) {
    console.log(err)
  }
}

export const deleteItem = orderItem => async dispatch => {
  const {id, productId, orderId} = orderItem

  try {
    const res = await axios.get('/auth/me')
    const user = res.data

    let orderItems
    if (!user) {
      // simply update items in the local storage.
      let orderItemsLS = JSON.parse(localStorage.getItem('order-items'))
      if (orderItemsLS) {
        orderItemsLS = orderItemsLS.filter(item => {
          return item.productId !== productId
        })
      }

      // simply add a Product instance to each item.
      orderItems = []
      if (orderItemsLS && orderItemsLS.length > 0) {
        let i = 1
        for (let item of orderItemsLS) {
          // adding product info to the orderItems to return to the React component
          let orderItem = {...item}
          let {data} = await axios.get(`/api/products/${item.productId}`)
          orderItem.product = data
          orderItem.id = i++
          orderItems.push(orderItem)
        }
        localStorage.setItem('order-items', JSON.stringify(orderItemsLS))
      } else {
        localStorage.removeItem('order-items')
      }
    } else {
      let orderRes = await axios.get(`/api/orders/${orderId}`)
      orderItems = orderRes.data.orderItems

      if (orderItems) {
        let i = 0
        for (; i < orderItems.length; i++) {
          if (orderItems[i].productId === productId) {
            // delete item from db.
            await axios.delete(`/api/orders/${orderId}/items/${id}`)
            break
          }
        }
      }

      // retrieve the actual items of this order again from DB.
      let updatedOrderRes = await axios.get(`/api/orders/${orderId}`)
      orderItems = updatedOrderRes.data.orderItems
    }

    dispatch(getCartItems(orderItems))
  } catch (err) {
    console.log(err)
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
      return {...state, cartItems: action.cart.orderItems, cart: action.cart}
    case GET_CART_ITEMS:
      return {...state, cartItems: action.orderItems}
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        cart: {}
      }
    // case UPDATE_ITEM_QUANTITY:
    //   const targetItem = state.cartItems.find(function(item) {
    //     return item.id == action.item.id
    //   });

    //   targetItem.quantity = action.quantity;

    //   const newCartItems = state.cartItems.filter(function(item) {
    //     return item.id !== targetItem.id;
    //   })
    //   return {...state, cartItems: [...newCartItems, targetItem]}
    default:
      return state
  }
}

export default cart
