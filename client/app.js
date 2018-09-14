import React from 'react'

import {Navbar, Login, Signup} from './components'
import AllProducts from './components/AllProducts'
import {Route} from 'react-router-dom'
import Routes from './routes'
import { Route, Switch } from 'react-router-dom'
import SingleProduct from './components/SingleProduct'


const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path = '/products/:productId' component = {SingleProduct}/>
        <Route exact path = '/products' component = {AllProducts}/>
      </Switch>

    </div>
  )
}

export default App
