import React, { Component } from "react";
import {connect} from 'react-redux'
import {addItemToCart, updateItem} from '../store/cart'
import {Link} from 'react-router-dom'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.cartItem.quantity
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault();
    // const newCartItem = [this.props.name, this.props.price, this.props.imgUrl,this.props.description, this.state.quantity];
    // this.props.addItemToCart(newCartItem)
    this.props.updateQuantity(this.props.cartItem, this.state.quantity)
  }

  render() {
    const { name, price, imgUrl, description } = this.props.cartItem.product;
    return (
        <TableRow className='cart-item'>
        <TableCell className='cart-item-img'><img src={imgUrl}/></TableCell>
        <TableCell className='cart-item-element'>{name}</TableCell>
        <TableCell className='cart-item-element'>{price}</TableCell>
        <TableCell className='cart-item-element'>{description}</TableCell>
        <TableCell className='cart-item-element'>
          <form id='orderItemQuantity' onSubmit={this.handleSubmit}>
        <select
        className='orderItemSelect'
        onChange={ (evt) => this.setState({quantity: evt.target.value})}
        defaultValue={this.state.quantity}
        >
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <button className='orderItemSelectButton' type='submit'>Select Quantity</button>
        </form>
        </TableCell>
      </TableRow>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item) => dispatch(addItemToCart(item)),
    updateQuantity: (item, quantity) => dispatch(updateItem(item,quantity))
  }
}

export default connect(null, mapDispatchToProps)(CartItem);
