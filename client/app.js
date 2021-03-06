import React from 'react'

import {Navbar, Login, Signup} from './components'
import CheckoutForm from './components/CheckoutForm'
import AllProducts from './components/AllProducts'

import {Route, Switch} from 'react-router-dom'
import SingleProduct from './components/SingleProduct'
import CheckoutPrompt from './components/CheckoutPrompt'
import Cart from './components/Cart'
import Orders from './components/Orders'
import OrderItems from './components/OrderItems'

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      {/* <Routes /> */}
      <Switch>
        <Route path="/checkout" component={CheckoutForm} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders/:orderNumber" component={OrderItems} />
        <Route path="/orders" component={Orders} />
        {/* <Route path="/home" component={UserHome} /> */}
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/" component={AllProducts} />
      </Switch>
      {/* <Button
      component={Link}
      to="/checkout-prompt"
      >
        Checkout
      </Button> */}
      <Route path="/checkout-prompt" component={CheckoutPrompt} />
    </React.Fragment>
  )
}

export default App
