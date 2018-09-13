import React from 'react'

import {Navbar} from './components'
import AllProducts from './components/AllProducts'
import Routes from './routes'
import { Route, Switch } from 'react-router-dom'
import SingleProduct from './components/SingleProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />

      <Switch>
        <Route path = '/products/:productId' component = {SingleProduct}/>
        <Route exact path = '/products' component = {AllProducts}/>
      </Switch>

    </div>
  )
}

export default App
