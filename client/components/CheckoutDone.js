import React, { Component } from 'react'
import { connect } from 'react-redux'


class CheckoutDone extends Component {

  render(){

    const { orderNumber } = this.props.completedOrder;
    return (
      <div id ='checkout-done'>
        <h1>Thank you for your order</h1>
        <h3>Your order number is: {orderNumber}</h3>
      </div>
    )
  }
}

const mapState = state => ({
  completedOrder: state.orders.completedOrder
});


export default connect(mapState)(CheckoutDone)
