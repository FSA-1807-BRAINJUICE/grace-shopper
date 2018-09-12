import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
//import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter >
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
