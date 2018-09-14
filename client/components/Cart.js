import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount () {
    this.props.getCart();
  }
  render () {
    const cart = this.props.cart;
    return (
      <div className='cart'>
        {
          cart.map(cartItem=> {
            return <CartItem cartItem={cartItem} key={cartItem.id} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.orders.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
