import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

// establishes socket connection
import './socket'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffc400'
    },
    secondary: {
      main: '#2196f3'
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
