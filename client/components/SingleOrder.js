import React from "react";
import {Link} from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const SingleOrder = (props) => {
  const { orderNumber, updatedAt, orderItems} = props.order;

  let totalPrice = 0;
  for(let item of orderItems){
    totalPrice += item.paidUnitPrice;
  }
  totalPrice = totalPrice.toFixed(2);

  return (
    <TableRow className='cart-item'>
      <TableCell className='cart-item-element'>{orderNumber}</TableCell>
      <TableCell className='cart-item-element'>{updatedAt}</TableCell>
      <TableCell className='cart-item-element'>{totalPrice}</TableCell>
      <TableCell className='cart-item-element'><Link to={`/orders/${props.order.orderNumber}`}>View Order Items</Link></TableCell>
    </TableRow>
  )
}

export default SingleOrder
