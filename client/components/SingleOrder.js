import React from "react";
import {Link} from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const SingleOrder = (props) => {
  const { orderNumber, orderDate } = props.order;
  return (
    <TableRow className='cart-item'>
      <TableCell className='cart-item-element'>{orderNumber}</TableCell>
      <TableCell className='cart-item-element'>{orderDate}</TableCell>
      <TableCell className='cart-item-element'>OrderPrice</TableCell>
      <TableCell className='cart-item-element'><Link to={`/orders/${props.order.id}`}>View Order Items</Link></TableCell>
    </TableRow>
  )
}

export default SingleOrder

