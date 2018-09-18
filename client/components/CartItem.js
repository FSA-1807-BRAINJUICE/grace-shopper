import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {addItemToCart, updateItem, deleteItem} from '../store/cart'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.cartItem.quantity
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    // const newCartItem = [this.props.name, this.props.price, this.props.imgUrl,this.props.description, this.state.quantity];
    // this.props.addItemToCart(newCartItem)
    this.props.updateQuantity(this.props.cartItem, this.state.quantity)
  }

  handleRemove(evt) {
    evt.preventDefault()
    this.props.deleteItem(this.props.cartItem)
  }

  render() {
    const {name, price, imgUrl} = this.props.cartItem.product
    //add accompany table cell in cart header?
    return (
      <TableRow className="cart-item">
        <TableCell className="cart-item-img">
          <img src={imgUrl} />
        </TableCell>
        <TableCell className="cart-item-element">{name}</TableCell>
        <TableCell className="cart-item-element">{price}</TableCell>
        <TableCell className="cart-item-element">
          <form id="orderItemQuantity" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.quantity}
              className="quantity-box"
              onChange={evt => this.setState({quantity: evt.target.value})}
            />

            <Button type="submit" size="small" onClick={this.handleSubmit}>
              <img src="change_quantity.svg" alt="change" />
            </Button>

            <Button size="small" onClick={this.handleRemove}>
              <img src="delete_item.svg" alt="delete" />
            </Button>
          </form>
        </TableCell>
      </TableRow>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => dispatch(addItemToCart(item)),
    updateQuantity: (item, quantity) => dispatch(updateItem(item, quantity)),
    deleteItem: item => dispatch(deleteItem(item))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
