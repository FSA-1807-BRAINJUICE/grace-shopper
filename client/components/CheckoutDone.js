import React, { Component } from 'react'
import { connect } from 'react-redux'

class CheckoutDone extends Component {

  render(){

    // const { orderNumber } = this.props.orders
    return (
      <div id ='checkout-done'>
        <h1>Thank you for your order</h1>
        <h3>Your order number is: {}</h3>
      </div>
    )
  }
}

// const mapState = state => ({
//   orders: state.orders.orderNumber
// })
// const mapDispatch = dispatch => ({

// })

export default CheckoutDone
