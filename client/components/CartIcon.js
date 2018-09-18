import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import {me} from '../store'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

class CartIcon extends Component {
  async componentDidMount() {
    await this.props.getMe()
    console.log('user', this.props.user)
    this.props.getCart(this.props.user.id)
    // console.log('user2', this.props.user)
  }

  render() {
    if (this.props.user && this.props.user.id) {
      return (
        <div>
          <Button
            component={Link}
            to="/cart"
            color="primary"
          >
            <img src="shopping_cart.svg" />
            {this.props.cartItems.length}
          </Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button
            component={Link}
            to="/cart"
            variant="outlined"
            color="primary"
          >
            <img src="shopping_cart.svg" />
            {this.props.cartItems.length}
          </Button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(me()),
  getCart: async id => {
    await dispatch(getCartThunk(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
