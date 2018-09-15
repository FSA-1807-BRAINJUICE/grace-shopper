import React from 'react'

import {Navbar, Login, Signup} from './components'
import Routes from './routes'
import { Route, Switch } from 'react-router-dom'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'


const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path='/cart' component={Cart} />
        <Route path = '/products/:productId' component = {SingleProduct}/>
        <Route exact path = '/products' component = {AllProducts}/>
      </Switch>

    </div>
  )
}

export default App
