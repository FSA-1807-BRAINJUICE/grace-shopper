import React from "react";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const SingleOrder = (props) => {
  const { name, price, imgUrl, description } = props.order;
  return (
    <TableRow className='cart-item'>
      <TableCell className='cart-item-img'><img src={imgUrl} /></TableCell>
      <TableCell className='cart-item-element'>{name}</TableCell>
      <TableCell className='cart-item-element'>{price}</TableCell>
      <TableCell className='cart-item-element'>{description}</TableCell>
    </TableRow>
  )
}

export default SingleOrder

