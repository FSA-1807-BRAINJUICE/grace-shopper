import React from "react";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const SingleOrderItem = (props) => {
  console.log(props.item)
  const {imgUrl, name, price, description} = props.item.product;
  return (
    <TableRow>
      <TableCell>{imgUrl}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  )
}
