import React from 'react'

import {Navbar, Login, Signup, UserHome} from './components'
import CheckoutForm from './components/CheckoutForm'
import AllProducts from './components/AllProducts'
import Routes from './routes'
import { Route, Switch } from 'react-router-dom'
import SingleProduct from './components/SingleProduct'


const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}
      <Switch>
        <Route path='/checkout' component={CheckoutForm} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />
        <Route path = '/products/:productId' component = {SingleProduct}/>
        <Route exact path = '/products' component = {AllProducts}/>
      </Switch>

    </div>
  )
}

export default App
