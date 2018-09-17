import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getCartThunk } from '../store/cart';
import { me } from '../store'

class CartIcon extends Component {

  componentDidMount(){
    // await this.props.getMe()
    // console.log('user', this.props.user)
    this.props.getCart(this.props.user.id)
    // console.log('user2', this.props.user)
  }

  render (){

    return (
    <div>
      <p>
        { this.props.user ? this.props.cartItems.length : 14 }
      </p>
    </div>
    )
  }



}

const mapStateToProps = state => ({
  user: state.user.user,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(me()),
  getCart: async (id) => {
    await dispatch(getCartThunk(id))
  }
})




export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
