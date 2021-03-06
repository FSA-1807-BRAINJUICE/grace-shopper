import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import products from './products'
import cart from './cart'
import user from './user'
import orders from './orders'

//CG: call it products not products Reducer
const rootReducer = combineReducers({products, user, cart, orders})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
