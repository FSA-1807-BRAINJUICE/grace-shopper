import React from 'react'

import {Navbar} from './components'
import AllProducts from './components/AllProducts'
import {Route} from 'react-router-dom'
import Routes from './routes'
import Cart from './components/Cart'

const App = () => {
  return (
    <div>
      <Navbar />
      <Route path='/cart' component={Cart}/>
      {/* <AllProducts /> */}
      <Routes />

    </div>
  )
}

export default App
