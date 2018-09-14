import React from 'react'

import {Navbar, Login, Signup} from './components'
import AllProducts from './components/AllProducts'
import {Route} from 'react-router-dom'
import Routes from './routes'
<<<<<<< HEAD
import Cart from './components/Cart'
=======
import { Route, Switch } from 'react-router-dom'
import SingleProduct from './components/SingleProduct'

>>>>>>> 3acab43f599cac5c47f51de6591ef397fd8148f2

const App = () => {
  return (
    <div>
      <Navbar />
<<<<<<< HEAD
      <Route path='/cart' component={Cart}/>
      {/* <AllProducts /> */}
      <Routes />
=======
      {/* <Routes /> */}

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path = '/products/:productId' component = {SingleProduct}/>
        <Route exact path = '/products' component = {AllProducts}/>
      </Switch>
>>>>>>> 3acab43f599cac5c47f51de6591ef397fd8148f2

    </div>
  )
}

export default App
